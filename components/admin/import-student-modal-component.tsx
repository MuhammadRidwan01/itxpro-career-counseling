"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft, Plus, Trash2, Edit, Check, Upload, Users, FileText, AlertCircle, CheckCircle, Loader2, Search, Move, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Define types for preview data
interface StudentInBlock {
  nis: string;
  nama: string;
  angkatan: number;
  originalRowIndex: number;
  originalColIndex: number;
}

interface ClassBlock {
  id: string;
  initialClass: string;
  initialJurusan: string;
  students: StudentInBlock[];
  startingRow: number;
  startingCol: number;
  nisColumn: number;
  selectedClass: string;
  selectedJurusan: string;
  isCustom: boolean;
}

type ImportStep = 'upload' | 'preview' | 'confirm';

interface ImportStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function ImportStudentModal({ isOpen, onClose, onSuccess }: ImportStudentModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<ImportStep>('upload');
  const [processedBlocks, setProcessedBlocks] = useState<ClassBlock[]>([]);
  const [importSummary, setImportSummary] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [editingBlockId, setEditingBlockId] = useState<string | null>(null);
  const [selectedStudentNis, setSelectedStudentNis] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [bulkMoveMode, setBulkMoveMode] = useState(false);
  const [draggedStudent, setDraggedStudent] = useState<{ student: StudentInBlock; sourceBlockId: string } | null>(null);

  // Filter blocks based on search
  const filteredBlocks = processedBlocks.filter(block => {
    const matchesSearch = searchQuery === "" || 
      block.selectedClass.toLowerCase().includes(searchQuery.toLowerCase()) ||
      block.students.some(student => 
        student.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.nis.includes(searchQuery)
      );
    return matchesSearch;
  });

  const handleStudentSelect = (nis: string) => {
    if (bulkMoveMode) {
      setSelectedStudentNis(prev =>
        prev.includes(nis) ? prev.filter(id => id !== nis) : [...prev, nis]
      );
    }
  };

  const handleBulkMove = (targetBlockId: string) => {
    if (selectedStudentNis.length === 0) return;

    setProcessedBlocks(prevBlocks => {
      let movedStudents: StudentInBlock[] = [];
      const newBlocks = prevBlocks.map(block => {
        const studentsToKeep = block.students.filter(s => !selectedStudentNis.includes(s.nis));
        const studentsToMove = block.students.filter(s => selectedStudentNis.includes(s.nis));
        movedStudents = [...movedStudents, ...studentsToMove];
        return { ...block, students: studentsToKeep };
      });

      return newBlocks.map(block => {
        if (block.id === targetBlockId) {
          return { ...block, students: [...block.students, ...movedStudents] };
        }
        return block;
      });
    });
    
    setSelectedStudentNis([]);
    setBulkMoveMode(false);
    toast.success(`${selectedStudentNis.length} siswa berhasil dipindahkan`);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setError(null);
    } else {
      setFile(null);
    }
    resetState();
  };

  const resetState = () => {
    setProcessedBlocks([]);
    setImportSummary(null);
    setCurrentStep('upload');
    setSelectedStudentNis([]);
    setSearchQuery("");
    setBulkMoveMode(false);
    setEditingBlockId(null);
  };

  const handleUploadAndPreview = async () => {
    if (!file) {
      toast.error("Pilih file CSV terlebih dahulu");
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/admin/siswa/import', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("File berhasil diproses");
        const blocksWithSelections: ClassBlock[] = data.processedBlocks.map((block: ClassBlock) => ({
          ...block,
          selectedClass: block.initialClass,
          selectedJurusan: block.initialJurusan,
          isCustom: false,
        }));
        setProcessedBlocks(blocksWithSelections);
        setCurrentStep('preview');
      } else {
        setError(data.message || "Terjadi kesalahan saat memproses file");
        toast.error("Gagal memproses file", { description: data.message });
      }
    } catch (error: any) {
      setError("Gagal terhubung ke server");
      toast.error("Error", { description: "Gagal terhubung ke server" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmImport = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/siswa/confirm-import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ processedBlocks }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Data berhasil diimpor");
        setImportSummary(data);
        setCurrentStep('confirm');
        onSuccess();
      } else {
        setError(data.message || "Gagal mengimpor data");
        toast.error("Import gagal", { description: data.message });
        setImportSummary(data);
      }
    } catch (error: any) {
      setError("Gagal terhubung ke server");
      toast.error("Error", { description: "Gagal terhubung ke server" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClassChange = (blockId: string, value: string) => {
    setProcessedBlocks(prevBlocks =>
      prevBlocks.map(block =>
        block.id === blockId ? { ...block, selectedClass: value } : block
      )
    );
  };

  const handleJurusanChange = (blockId: string, value: string) => {
    setProcessedBlocks(prevBlocks =>
      prevBlocks.map(block =>
        block.id === blockId ? { ...block, selectedJurusan: value } : block
      )
    );
  };

  const handleAddBlock = () => {
    const newBlockId = `custom-block-${Date.now()}`;
    const newBlock: ClassBlock = {
      id: newBlockId,
      initialClass: "Kelas Baru",
      initialJurusan: "Umum",
      students: [],
      startingRow: -1,
      startingCol: -1,
      nisColumn: -1,
      selectedClass: "Kelas Baru",
      selectedJurusan: "Umum",
      isCustom: true,
    };
    setProcessedBlocks(prevBlocks => [...prevBlocks, newBlock]);
    setEditingBlockId(newBlockId);
  };

  const handleDeleteBlock = (blockId: string) => {
    const block = processedBlocks.find(b => b.id === blockId);
    if (block && block.students.length > 0) {
      if (!confirm("Kelas ini berisi siswa. Yakin ingin menghapus?")) {
        return;
      }
    }
    setProcessedBlocks(prevBlocks => prevBlocks.filter(block => block.id !== blockId));
    setEditingBlockId(null);
  };

  const handleCloseModal = () => {
    setFile(null);
    setIsLoading(false);
    resetState();
    onClose();
  };

  const handleDragStart = (student: StudentInBlock, sourceBlockId: string) => {
    setDraggedStudent({ student, sourceBlockId });
  };

  const handleDragEnd = () => {
    setDraggedStudent(null);
  };

  const handleDrop = (targetBlockId: string) => {
    if (!draggedStudent || draggedStudent.sourceBlockId === targetBlockId) {
      return;
    }

    setProcessedBlocks(prevBlocks => {
      const newBlocks = prevBlocks.map(block => {
        if (block.id === draggedStudent.sourceBlockId) {
          return { 
            ...block, 
            students: block.students.filter(s => s.nis !== draggedStudent.student.nis) 
          };
        }
        if (block.id === targetBlockId) {
          return { 
            ...block, 
            students: [...block.students, draggedStudent.student] 
          };
        }
        return block;
      });
      return newBlocks;
    });
    
    toast.success(`${draggedStudent.student.nama} dipindahkan`);
    setDraggedStudent(null);
  };

  const getTotalStudents = () => processedBlocks.reduce((total, block) => total + block.students.length, 0);

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="max-w-[98vw] max-h-[98vh] w-full flex flex-col p-0 gap-0">
        <DialogHeader className="p-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50 flex-shrink-0">
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Upload className="w-5 h-5 text-blue-600" />
            Import Data Siswa
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            {currentStep === 'upload' && "Upload file CSV untuk memulai proses import siswa"}
            {currentStep === 'preview' && `Review dan atur ${getTotalStudents()} siswa dalam ${processedBlocks.length} kelas`}
            {currentStep === 'confirm' && "Proses import selesai"}
          </DialogDescription>
        </DialogHeader>

        {/* Upload Step */}
        {currentStep === 'upload' && (
          <div className="flex-1 p-6">
            <div className="max-w-md mx-auto">
              <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center bg-blue-50/50 hover:bg-blue-50 transition-colors">
                <Upload className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <Label htmlFor="csv-file" className="cursor-pointer">
                  <Input 
                    id="csv-file" 
                    type="file" 
                    accept=".csv" 
                    onChange={handleFileChange} 
                    className="hidden" 
                  />
                  <div className="text-lg font-semibold text-gray-700 mb-2">
                    Pilih File CSV
                  </div>
                  <div className="text-sm text-gray-500">
                    atau drag & drop file di sini
                  </div>
                </Label>
              </div>
              
              {file && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 text-green-700">
                    <FileText className="w-4 h-4" />
                    <span className="font-medium">{file.name}</span>
                  </div>
                </div>
              )}
              
              {error && (
                <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center gap-2 text-red-700">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">{error}</span>
                  </div>
                </div>
              )}
              
              <Button 
                onClick={handleUploadAndPreview} 
                disabled={!file || isLoading} 
                className="w-full mt-6 h-12 text-base font-semibold"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Memproses File...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload & Preview
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Preview Step - Simplified for maximum space efficiency */}
        {currentStep === 'preview' && (
          <div className="flex-1 flex flex-col overflow-hidden min-h-0">
            {/* Minimal Controls */}
            <div className="p-3 border-b bg-gray-50 flex-shrink-0">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
                    <Input
                      placeholder="Cari kelas atau siswa..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-7 h-8 w-64 text-sm"
                    />
                  </div>
                  <div className="text-xs text-gray-600 flex items-center gap-4">
                    <span>{getTotalStudents()} siswa</span>
                    <span>{processedBlocks.length} kelas</span>
                    {selectedStudentNis.length > 0 && <Badge variant="secondary" className="text-xs">{selectedStudentNis.length} dipilih</Badge>}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant={bulkMoveMode ? "default" : "outline"}
                    size="sm"
                    className="h-8 text-xs"
                    onClick={() => {
                      setBulkMoveMode(!bulkMoveMode);
                      setSelectedStudentNis([]);
                    }}
                  >
                    <Move className="w-3 h-3 mr-1" />
                    {bulkMoveMode ? "Selesai" : "Pindah Massal"}
                  </Button>
                  
                  {bulkMoveMode && selectedStudentNis.length > 0 && (
                    <Select onValueChange={handleBulkMove}>
                      <SelectTrigger className="w-36 h-8 text-xs">
                        <SelectValue placeholder={`Pindahkan ${selectedStudentNis.length}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {processedBlocks.map(block => (
                          <SelectItem key={block.id} value={block.id}>
                            {block.selectedClass}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  
                  <Button onClick={handleAddBlock} size="sm" className="h-8 text-xs">
                    <Plus className="w-3 h-3 mr-1" />
                    Tambah
                  </Button>
                </div>
              </div>
            </div>

            {/* Ultra-compact Class Grid */}
            <div className="flex-1 overflow-auto p-2">
              {filteredBlocks.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-sm">
                    {searchQuery ? "Tidak ada kelas yang sesuai dengan pencarian" : "Belum ada data kelas"}
                  </p>
                </div>
              ) : (
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 3xl:columns-7 4xl:columns-8 gap-2 space-y-2">
                  {filteredBlocks.map((block) => (
                    <div 
                      key={block.id} 
                      className="break-inside-avoid bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow p-2 mb-2"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        handleDrop(block.id);
                      }}
                    >
                      {/* Compact Header */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          {editingBlockId === block.id ? (
                            <div className="space-y-1">
                              <Input
                                value={block.selectedClass}
                                onChange={(e) => handleClassChange(block.id, e.target.value)}
                                className="h-6 text-xs font-semibold px-2"
                                placeholder="Nama Kelas"
                              />
                              <Select
                                value={block.selectedJurusan}
                                onValueChange={(value) => handleJurusanChange(block.id, value)}
                              >
                                <SelectTrigger className="h-6 text-xs px-2">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Umum">Umum</SelectItem>
                                  <SelectItem value="RPL">RPL</SelectItem>
                                  <SelectItem value="TKJ">TKJ</SelectItem>
                                  <SelectItem value="DKV">DKV</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          ) : (
                            <>
                              <h3 className="text-sm font-bold truncate">{block.selectedClass}</h3>
                              <div className="flex items-center gap-1 mt-1">
                                <Badge variant="secondary" className="text-[10px] px-1 py-0 h-4">
                                  {block.selectedJurusan}
                                </Badge>
                                <Badge variant="outline" className="text-[10px] px-1 py-0 h-4">
                                  {block.students.length}
                                </Badge>
                              </div>
                            </>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-0.5 ml-1">
                          {editingBlockId === block.id ? (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => setEditingBlockId(null)}
                              className="h-5 w-5 p-0"
                            >
                              <Check className="w-3 h-3 text-green-600" />
                            </Button>
                          ) : (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => setEditingBlockId(block.id)}
                              className="h-5 w-5 p-0"
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                          )}
                          {block.isCustom && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleDeleteBlock(block.id)}
                              className="h-5 w-5 p-0 text-red-600"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      {/* Student List */}
                      <div className="space-y-1 max-h-96 overflow-y-auto">
                        {block.students.length === 0 ? (
                          <div className="text-center py-4 text-gray-400 border-2 border-dashed border-gray-200 rounded text-xs">
                            <Users className="w-4 h-4 mx-auto mb-1" />
                            <p>Kosong</p>
                          </div>
                        ) : (
                          block.students.map((student) => (
                            <div
                              key={student.nis}
                              className={`p-1.5 rounded border cursor-move transition-colors text-xs ${
                                bulkMoveMode && selectedStudentNis.includes(student.nis)
                                  ? 'bg-blue-50 border-blue-200'
                                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                              }`}
                              draggable={!bulkMoveMode}
                              onDragStart={() => !bulkMoveMode && handleDragStart(student, block.id)}
                              onDragEnd={handleDragEnd}
                              onClick={() => bulkMoveMode && handleStudentSelect(student.nis)}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium truncate leading-tight">{student.nama}</div>
                                  <div className="text-[10px] text-gray-500 leading-tight">NIS: {student.nis}</div>
                                </div>
                                {bulkMoveMode && (
                                  <div className={`w-3 h-3 rounded border flex-shrink-0 ${
                                    selectedStudentNis.includes(student.nis)
                                      ? 'bg-blue-600 border-blue-600'
                                      : 'border-gray-300'
                                  }`}>
                                    {selectedStudentNis.includes(student.nis) && (
                                      <Check className="w-2 h-2 text-white m-auto" />
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Confirm Step */}
        {currentStep === 'confirm' && importSummary && (
          <div className="flex-1 p-6">
            <div className="max-w-2xl mx-auto text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Import Selesai</h3>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold">{importSummary.summary?.totalProcessed || 0}</div>
                  <div className="text-sm text-gray-600">Total</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{importSummary.importedCount || 0}</div>
                  <div className="text-sm text-green-600">Berhasil</div>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{importSummary.failedCount || 0}</div>
                  <div className="text-sm text-red-600">Gagal</div>
                </div>
              </div>
              
              {importSummary.failedDetails && importSummary.failedDetails.length > 0 && (
                <div className="p-4 bg-red-50 rounded-lg text-left mb-6">
                  <h5 className="font-medium text-red-800 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Detail Kegagalan
                  </h5>
                  <div className="max-h-32 overflow-y-auto space-y-1 text-sm">
                    {importSummary.failedDetails.map((detail: any, index: number) => (
                      <div key={index} className="p-2 bg-red-100 rounded text-xs">
                        <div className="font-medium">{detail.data?.nama} ({detail.data?.nis})</div>
                        <div className="text-red-600">{detail.reason}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-between items-center p-4 border-t bg-gray-50 flex-shrink-0">
          <div>
            {currentStep === 'preview' && (
              <Button 
                onClick={() => setCurrentStep('upload')} 
                variant="outline"
                disabled={isLoading}
                size="sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali
              </Button>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={handleCloseModal} 
              variant="outline"
              disabled={isLoading}
              size="sm"
            >
              <X className="w-4 h-4 mr-2" />
              {currentStep === 'confirm' ? 'Tutup' : 'Batal'}
            </Button>
            
            {currentStep === 'preview' && (
              <Button 
                onClick={handleConfirmImport} 
                disabled={isLoading || processedBlocks.length === 0}
                size="sm"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Mengimpor...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Konfirmasi Import
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}