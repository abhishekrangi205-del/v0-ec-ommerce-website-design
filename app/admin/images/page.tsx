'use client'

import { useState, useCallback, useRef } from 'react'
import { products, ProductDetails } from '@/lib/products'
import Image from 'next/image'
import { Upload, X, Check, AlertCircle, Loader2, ImageIcon, Trash2, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import Link from 'next/link'

interface UploadedFile {
  file: File
  preview: string
  productMatch: ProductDetails | null
  imageNumber: number
  status: 'pending' | 'uploading' | 'success' | 'error'
  errorMessage?: string
}

interface ProductImageGroup {
  product: ProductDetails
  files: UploadedFile[]
}

// Extract product name and image number from filename
function parseFileName(fileName: string): { productName: string; imageNumber: number } | null {
  // Remove file extension
  const nameWithoutExt = fileName.replace(/\.(jpg|jpeg|png|webp)$/i, '')
  
  // Check for numbered pattern: "Product Name (1)" or "Product Name (2)"
  const numberedMatch = nameWithoutExt.match(/^(.+?)\s*\((\d+)\)$/)
  if (numberedMatch) {
    return {
      productName: numberedMatch[1].trim(),
      imageNumber: parseInt(numberedMatch[2], 10)
    }
  }
  
  // No number means it's image 1
  return {
    productName: nameWithoutExt.trim(),
    imageNumber: 1
  }
}

// Find matching product by name (fuzzy match)
function findMatchingProduct(productName: string): ProductDetails | null {
  const normalizedInput = productName.toLowerCase().trim()
  
  // Try exact match first
  let match = products.find(p => 
    p.name.toLowerCase() === normalizedInput ||
    p.name.toLowerCase().replace(/\s*-\s*/g, ' ').includes(normalizedInput) ||
    normalizedInput.includes(p.name.toLowerCase().replace(/\s*-\s*/g, ' '))
  )
  
  if (match) return match
  
  // Try partial match - check if product name contains the uploaded file name
  match = products.find(p => {
    const pName = p.name.toLowerCase().replace(/\s*-\s*/g, ' ')
    return pName.includes(normalizedInput) || normalizedInput.includes(pName)
  })
  
  if (match) return match
  
  // Try matching key words
  const inputWords = normalizedInput.split(/\s+/)
  match = products.find(p => {
    const pWords = p.name.toLowerCase().split(/\s+/)
    const matchCount = inputWords.filter(w => pWords.some(pw => pw.includes(w) || w.includes(pw))).length
    return matchCount >= 2
  })
  
  return match || null
}

export default function AdminImagesPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [logs, setLogs] = useState<{ type: 'success' | 'error' | 'info'; message: string; time: Date }[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const addLog = (type: 'success' | 'error' | 'info', message: string) => {
    setLogs(prev => [...prev, { type, message, time: new Date() }])
  }

  const handleFiles = useCallback((files: FileList | File[]) => {
    const validExtensions = ['jpg', 'jpeg', 'png', 'webp']
    const newFiles: UploadedFile[] = []
    
    Array.from(files).forEach(file => {
      const ext = file.name.split('.').pop()?.toLowerCase()
      if (!ext || !validExtensions.includes(ext)) {
        addLog('error', `Skipped ${file.name} - unsupported format`)
        return
      }
      
      const parsed = parseFileName(file.name)
      if (!parsed) {
        addLog('error', `Could not parse filename: ${file.name}`)
        return
      }
      
      const matchedProduct = findMatchingProduct(parsed.productName)
      
      // Check for duplicates
      const isDuplicate = uploadedFiles.some(
        uf => uf.productMatch?.id === matchedProduct?.id && uf.imageNumber === parsed.imageNumber
      )
      
      if (isDuplicate) {
        addLog('info', `Skipped duplicate: ${file.name}`)
        return
      }
      
      newFiles.push({
        file,
        preview: URL.createObjectURL(file),
        productMatch: matchedProduct,
        imageNumber: parsed.imageNumber,
        status: 'pending'
      })
      
      if (matchedProduct) {
        addLog('success', `Matched "${file.name}" to "${matchedProduct.name}"`)
      } else {
        addLog('error', `No product match for "${file.name}"`)
      }
    })
    
    setUploadedFiles(prev => [...prev, ...newFiles])
  }, [uploadedFiles])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFiles(e.dataTransfer.files)
  }, [handleFiles])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const removeFile = (index: number) => {
    setUploadedFiles(prev => {
      const newFiles = [...prev]
      URL.revokeObjectURL(newFiles[index].preview)
      newFiles.splice(index, 1)
      return newFiles
    })
  }

  const clearAll = () => {
    uploadedFiles.forEach(f => URL.revokeObjectURL(f.preview))
    setUploadedFiles([])
    setLogs([])
  }

  // Group files by product
  const groupedFiles: ProductImageGroup[] = uploadedFiles
    .filter(f => f.productMatch)
    .reduce((groups, file) => {
      const existing = groups.find(g => g.product.id === file.productMatch!.id)
      if (existing) {
        existing.files.push(file)
        existing.files.sort((a, b) => a.imageNumber - b.imageNumber)
      } else {
        groups.push({ product: file.productMatch!, files: [file] })
      }
      return groups
    }, [] as ProductImageGroup[])

  const unmatchedFiles = uploadedFiles.filter(f => !f.productMatch)

  const handleConfirmUpload = async () => {
    setIsUploading(true)
    setShowConfirmation(false)
    
    // Simulate upload process - in production this would upload to your storage
    for (const group of groupedFiles) {
      addLog('info', `Processing ${group.product.name}...`)
      
      for (const file of group.files) {
        const fileIndex = uploadedFiles.findIndex(f => f === file)
        setUploadedFiles(prev => {
          const newFiles = [...prev]
          newFiles[fileIndex] = { ...newFiles[fileIndex], status: 'uploading' }
          return newFiles
        })
        
        // Simulate upload delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        setUploadedFiles(prev => {
          const newFiles = [...prev]
          newFiles[fileIndex] = { ...newFiles[fileIndex], status: 'success' }
          return newFiles
        })
        
        addLog('success', `Uploaded image ${file.imageNumber} for ${group.product.name}`)
      }
    }
    
    setIsUploading(false)
    addLog('success', 'All images processed successfully!')
  }

  const matchedCount = uploadedFiles.filter(f => f.productMatch).length
  const totalCount = uploadedFiles.length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Store
            </Link>
            <div className="h-6 w-px bg-border" />
            <h1 className="text-xl font-bold">Bulk Image Manager</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Drop Zone */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Product Images
                </CardTitle>
                <CardDescription>
                  Drag and drop images or click to browse. File names should match product names exactly.
                  <br />
                  Use numbering for multiple images: <code className="bg-muted px-1 rounded">Product Name (1).jpg</code>, <code className="bg-muted px-1 rounded">Product Name (2).jpg</code>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                  className={`
                    border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all
                    ${isDragging 
                      ? 'border-primary bg-primary/5 scale-[1.02]' 
                      : 'border-border hover:border-primary/50 hover:bg-muted/50'
                    }
                  `}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".jpg,.jpeg,.png,.webp"
                    onChange={(e) => e.target.files && handleFiles(e.target.files)}
                    className="hidden"
                  />
                  <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-lg font-medium mb-2">
                    {isDragging ? 'Drop images here' : 'Drag & drop images here'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Supports JPG, JPEG, PNG, WebP
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Matched Products */}
            {groupedFiles.length > 0 && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-green-600 flex items-center gap-2">
                      <Check className="h-5 w-5" />
                      Matched Products ({groupedFiles.length})
                    </CardTitle>
                    <CardDescription>
                      These images will replace existing product images
                    </CardDescription>
                  </div>
                  <Button variant="destructive" size="sm" onClick={clearAll}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {groupedFiles.map((group) => (
                    <div key={group.product.id} className="border rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="relative h-12 w-12 rounded overflow-hidden bg-muted">
                          <Image
                            src={group.product.image}
                            alt={group.product.name}
                            fill
                            className="object-contain"
                            unoptimized
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">{group.product.name}</h4>
                          <p className="text-xs text-muted-foreground">
                            {group.files.length} image(s) to upload
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {group.files.map((file, idx) => (
                          <div key={idx} className="relative group">
                            <div className="relative h-20 w-20 rounded overflow-hidden bg-muted border">
                              <Image
                                src={file.preview}
                                alt={`Preview ${file.imageNumber}`}
                                fill
                                className="object-cover"
                              />
                              {file.status === 'uploading' && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                  <Loader2 className="h-6 w-6 text-white animate-spin" />
                                </div>
                              )}
                              {file.status === 'success' && (
                                <div className="absolute inset-0 bg-green-500/50 flex items-center justify-center">
                                  <Check className="h-6 w-6 text-white" />
                                </div>
                              )}
                            </div>
                            <span className="absolute -top-2 -left-2 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                              {file.imageNumber}
                            </span>
                            <button
                              onClick={() => removeFile(uploadedFiles.indexOf(file))}
                              className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Unmatched Files */}
            {unmatchedFiles.length > 0 && (
              <Card className="border-destructive/50">
                <CardHeader>
                  <CardTitle className="text-destructive flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Unmatched Files ({unmatchedFiles.length})
                  </CardTitle>
                  <CardDescription>
                    These files did not match any product names
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 flex-wrap">
                    {unmatchedFiles.map((file, idx) => (
                      <div key={idx} className="relative group">
                        <div className="relative h-20 w-20 rounded overflow-hidden bg-muted border border-destructive/30">
                          <Image
                            src={file.preview}
                            alt="Unmatched"
                            fill
                            className="object-cover opacity-50"
                          />
                        </div>
                        <button
                          onClick={() => removeFile(uploadedFiles.indexOf(file))}
                          className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                        >
                          <X className="h-3 w-3" />
                        </button>
                        <p className="text-xs text-muted-foreground mt-1 max-w-[80px] truncate">
                          {file.file.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upload Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Upload Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Files</span>
                  <span className="font-medium">{totalCount}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Matched</span>
                  <span className="font-medium">{matchedCount}</span>
                </div>
                <div className="flex justify-between text-destructive">
                  <span>Unmatched</span>
                  <span className="font-medium">{totalCount - matchedCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Products to Update</span>
                  <span className="font-medium">{groupedFiles.length}</span>
                </div>
                
                {/* Progress Bar */}
                {totalCount > 0 && (
                  <div className="space-y-2">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all"
                        style={{ width: `${(matchedCount / totalCount) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                      {Math.round((matchedCount / totalCount) * 100)}% matched
                    </p>
                  </div>
                )}

                <Button 
                  className="w-full" 
                  size="lg"
                  disabled={matchedCount === 0 || isUploading}
                  onClick={() => setShowConfirmation(true)}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Replace Images
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Activity Log */}
            <Card>
              <CardHeader>
                <CardTitle>Activity Log</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 overflow-y-auto space-y-2 text-sm">
                  {logs.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">
                      No activity yet
                    </p>
                  ) : (
                    logs.map((log, idx) => (
                      <div 
                        key={idx}
                        className={`flex items-start gap-2 ${
                          log.type === 'success' ? 'text-green-600' :
                          log.type === 'error' ? 'text-destructive' :
                          'text-muted-foreground'
                        }`}
                      >
                        {log.type === 'success' ? <Check className="h-4 w-4 mt-0.5 shrink-0" /> :
                         log.type === 'error' ? <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" /> :
                         <span className="h-4 w-4 shrink-0" />}
                        <span className="break-words">{log.message}</span>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>Confirm Image Replacement</CardTitle>
              <CardDescription>
                This will replace existing images for {groupedFiles.length} product(s).
                This action cannot be undone.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="text-sm space-y-1">
                {groupedFiles.map(g => (
                  <li key={g.product.id} className="flex justify-between">
                    <span>{g.product.name}</span>
                    <span className="text-muted-foreground">{g.files.length} image(s)</span>
                  </li>
                ))}
              </ul>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setShowConfirmation(false)}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handleConfirmUpload}>
                  Confirm Replace
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
