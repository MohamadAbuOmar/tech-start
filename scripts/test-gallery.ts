import { PrismaClient } from "@prisma/client";
import { ApiResponse, ApiSuccessResponse } from "../src/types/api";

interface LocalizedImage {
  id: string;
  url: string;
  title: string | null;
  featured: boolean;
}

interface LocalizedGallery {
  id: string;
  title: string;
  images: LocalizedImage[];
}

const db = new PrismaClient();

// Mock server actions since we can't use them directly in a test script
const getGalleryPhotos = async (language: 'en' | 'ar' = 'en'): Promise<ApiResponse<LocalizedGallery[]>> => {
  try {
    const galleries = await db.gallery.findMany({
      include: {
        images: {
          orderBy: {
            featured: 'desc'
          }
        }
      },
      orderBy: { createdAt: 'desc' },
    });

    const localizedGalleries = galleries.map(gallery => ({
      id: gallery.id,
      title: language === 'en' ? gallery.title_en : gallery.title_ar,
      images: gallery.images.map(image => ({
        id: image.id,
        url: image.url,
        title: image.title_en && image.title_ar ? 
          (language === 'en' ? image.title_en : image.title_ar) : 
          null,
        featured: image.featured
      }))
    }));

    return {
      success: true,
      data: localizedGalleries
    };
  } catch (error) {
    console.error('Error fetching galleries:', error);
    return {
      success: false,
      error: 'Failed to fetch galleries'
    };
  }
};

const addImageToGallery = async (
  galleryId: string, 
  imageUrl: string, 
  title_en: string, 
  title_ar: string
): Promise<ApiResponse<LocalizedImage>> => {
  try {
    const image = await db.image.create({
      data: {
        url: imageUrl,
        title_en,
        title_ar,
        galleryId,
        featured: false
      }
    });

    return {
      success: true,
      data: {
        id: image.id,
        url: image.url,
        title: image.title_en,
        featured: image.featured
      }
    };
  } catch (error) {
    console.error('Error adding image to gallery:', error);
    return {
      success: false,
      error: 'Failed to add image to gallery'
    };
  }
};

async function testGallery() {
  console.log('Testing gallery functionality...');

  try {
    // Test fetching gallery photos in both languages
    console.log('\nTesting gallery photo retrieval...');
    const enResponse = await getGalleryPhotos('en');
    const arResponse = await getGalleryPhotos('ar');

    if (!enResponse.success || !arResponse.success) {
      throw new Error('Failed to fetch gallery photos');
    }

    console.log('✓ Successfully fetched gallery photos in both languages');
    
    if (enResponse.data) {
      console.log(`Found ${enResponse.data.length} galleries`);

      // Test adding an image to the first gallery
      if (enResponse.data.length > 0) {
        const firstGallery = enResponse.data[0];
        console.log('\nTesting image upload to gallery:', firstGallery.id);

        const result = await addImageToGallery(
          firstGallery.id,
          '/images/test-image.jpg',
          'Test Image EN',
          'صورة اختبار'
        );

        if (!result.success) {
          throw new Error(`Failed to add image: ${result.error}`);
        }

        console.log('✓ Successfully added test image to gallery');
      }

      // Verify featured image validation
      console.log('\nTesting featured image validation...');
      const updatedResponse = await getGalleryPhotos('en');
      if (!updatedResponse.success || !updatedResponse.data) {
        throw new Error('Failed to fetch updated gallery photos');
      }

      const firstGalleryImages = updatedResponse.data[0]?.images || [];
      const featuredImages = firstGalleryImages.filter((img: LocalizedImage) => img.featured);
      
      if (featuredImages.length > 1) {
        throw new Error('Multiple featured images found in gallery');
      }

      console.log('✓ Featured image validation passed');
      console.log('\nAll gallery tests completed successfully!');
    }
  } catch (error) {
    console.error('Error during gallery tests:', error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  }
}

testGallery().catch(console.error);
