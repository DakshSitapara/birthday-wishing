'use client';

import { useState } from "react";
import QRCode from "qrcode";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Download, ClipboardCopy } from "lucide-react";

export default function QRCodeGenerator() {
  const [name, setName] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

  const buildUrl = () => {
    const baseUrl = window.location.href.replace(/\/$/, "");
    const safeName = encodeURIComponent(name.trim());
    return `${baseUrl}/${safeName}`;
  };

  const generateQRCode = async () => {
    if (!name.trim()) {
      return toast.error("Please enter a Name");
    }

    try {
      const width = Math.min(350, Math.max(200, window.innerWidth * 0.8));
      const url = buildUrl();

      const dataUrl = await QRCode.toDataURL(url, { width });
      setQrCodeUrl(dataUrl);
      toast.success("QR Code generated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Error generating QR Code");
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeUrl) return toast.error("No QR Code to download");

    try {
      const link = document.createElement("a");
      link.href = qrCodeUrl;
      link.download = `${name}.png`;
      link.click();
      toast.success("QR Code downloaded successfully");
    } catch (err) {
      console.error(err);
      toast.error("Error downloading QR Code");
    }
  };

  const copyUrlToClipboard = async () => {
    if (!name.trim()) return toast.error("No URL to copy");

    try {
      const url = buildUrl();
      await navigator.clipboard.writeText(url);
      toast.success("URL copied to clipboard");
    } catch (err) {
      console.error(err);
      toast.error("Failed to copy URL",);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-auto max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl shadow-lg rounded-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-lg sm:text-xl md:text-2xl">
            QR Code Generator
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 px-4 sm:px-6 md:px-8">
          <Input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full"
          />

          {qrCodeUrl && (
            <picture>
            <img
              src={qrCodeUrl}
              alt="QR Code"
              className="border p-2 rounded shadow-sm w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto"
            />
            </picture>
          )}

          <CardFooter className="flex flex-wrap gap-2 items-center justify-center mt-2">
            <Button onClick={generateQRCode} className="w-full sm:w-auto">
              Generate QR Code
            </Button>

            <div className="flex gap-2">
              {name && (
                <Button
                  onClick={copyUrlToClipboard}
                  title="Copy URL to Clipboard"
                  aria-label="Copy URL to clipboard"
                >
                  <ClipboardCopy className="w-4 h-4" />
                </Button>
              )}

              {qrCodeUrl && (
                <Button
                  onClick={downloadQRCode}
                  title="Download QR Code"
                  aria-label="Download QR Code"
                >
                  <Download className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
}
