import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { blobToBase64 } from "@/utils/blob";
import { ImagePlus, X } from "lucide-react";
import { useCallback, useState } from "react";

let counterDrag = 0;
export const CreatePost = ({
  upload,
  isLoading,
}: {
  upload: (text?: string, imageBase64?: string) => void;
  isLoading: boolean;
}) => {
  const [selectedImage, setSelectedImage] = useState<Blob | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();
  const [postText, setPostText] = useState("");

  const handleFile = useCallback((file: File | null | undefined) => {
    if (file?.size && file.size > 1 * 1024 * 1024) {
      console.log("File size should be less than 1MB");
      const toastRes = toast({
        variant: "destructive",
        description: "File size should be less than 1MB",
      });
      setTimeout(toastRes.dismiss, 3000);
      return;
    }
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
    }
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (counterDrag == 0) setIsDragging(true);
    counterDrag++;
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    counterDrag--;
    if (counterDrag == 0) setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    counterDrag = 0;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      counterDrag = 0;
      const file = e.target.files?.[0];
      handleFile(file);
    },
    []
  );
  const onUpload = useCallback(() => {
    if (isLoading) return;
    if (!postText && !selectedImage) {
      const toastRes = toast({
        variant: "destructive",
        description: "Please add text or an image to post",
      });
      setTimeout(toastRes.dismiss, 1000);
      return;
    }
    if (selectedImage) {
      blobToBase64(selectedImage).then((base64) => {
        upload(postText, base64);
        setPostText("");
        setSelectedImage(null);
      });
    } else {
      upload(postText);
      setPostText("");
      setSelectedImage(null);
    }
  }, [
    upload,
    postText,
    selectedImage,
    setPostText,
    setSelectedImage,
    isLoading,
    toast,
  ]);

  const removeImage = useCallback(() => {
    setSelectedImage(null);
  }, []);
  return (
    <Card>
      <CardContent className="p-4">
        <Textarea
          className="w-full p-2 border border-slate-200 rounded-md dark:border-slate-800"
          placeholder="What's on your mind?"
          rows={3}
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        />
        <div
          className={`mt-2 border-2 border-dashed rounded-md p-4 text-center cursor-pointer drop-image ${
            isDragging ? " bg-slate-100" : "border-slate-400"
          }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => document.getElementById("image-upload")?.click()}
        >
          <input
            type="file"
            id="image-upload"
            className="hidden"
            accept="image/*"
            onChange={handleFileSelect}
          />
          {selectedImage ? (
            <div className="relative">
              <img
                src={selectedImage && URL.createObjectURL(selectedImage)}
                alt="Selected"
                className="max-h-40 mx-auto rounded-md"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-0 right-0 -mt-2 -mr-2"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage();
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="">
              <ImagePlus className="mx-auto h-12 w-12 mb-2" />
              <p>Drag and drop an image here, or click to select</p>
            </div>
          )}
        </div>
        <div className="mt-2 flex justify-end">
          <Button onClick={onUpload}>Post</Button>
        </div>
      </CardContent>
    </Card>
  );
};
