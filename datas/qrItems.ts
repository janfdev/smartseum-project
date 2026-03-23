export type QRItem = {
  id: string;
  name: string;
  description: string;
  modelUrl?: string; 
  origin?: string;
  year?: string;
  imageUrl?: string;
};

export const qrItems: QRItem[] = [
  {
    id: "qr-1",
    name: "Cursed Monolith",
    description: "An ancient artifact discovered recently glowing with strange energy.",
    origin: "Temple of Shadows",
    year: "1405",
    imageUrl: "https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "qr-2",
    name: "Tesseract Fragment",
    description: "An expression of modern minimalist art bridging 4 dimensions.",
    origin: "Neo-Tokyo Gallery",
    year: "2088",
    imageUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "qr-3",
    name: "Golden Torus",
    description: "A digital representation of spatial loops used in old ceremonies.",
    origin: "Silicon Valley Vault",
    year: "1994",
    imageUrl: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  }
];
