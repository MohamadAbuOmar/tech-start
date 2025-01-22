import { notFound } from "next/navigation";
import db from "@/app/db/db";
import EditGalleryForm from "@/components/admin/Gallary/Image/EditGalleryForm";



async function getGallery(id: string) {
    const gallery = await db.gallery.findUnique({
        where: { id },
        include: { images: true },
    });

    if (!gallery) {
        notFound();
    }

    return gallery;
}


export default async function EditGalleryPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const gallery = await getGallery(id);
    const formattedGallery = {
        ...gallery,
        createdAt: gallery.createdAt.toISOString(),
        updatedAt: gallery.updatedAt.toISOString(),
        images: gallery.images.map(img => ({
            ...img,
            createdAt: img.createdAt.toISOString()
        }))
    };

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-5">Edit Gallery</h1>
            <EditGalleryForm gallery={formattedGallery} />
        </div>
    );
}

