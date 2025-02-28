import { cloudinaryImage } from '@keystone-next/cloudinary';
import { relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import 'dotenv/config';
import { permissions, rules } from '../access';

export const ProductImage = list({
    access: {
        create: isSignedIn,
        read: () => true,
        update: permissions.canManageProducts,
        delete: permissions.canManageProducts,
    },
    fields: {
        image: cloudinaryImage({
            cloudinary: {
                cloudName: process.env.CLOUDINARY_CLOUD_NAME,
                apiKey: process.env.CLOUDINARY_KEY,
                apiSecret: process.env.CLOUDINARY_SECRET,
                folder: 'sickfits',
            },
            label: 'Source',
        }),
        altText: text(),
        product: relationship({ ref: 'Product.photo' }),
    },
    ui: {
        listView: {
            initialColumns: ['image', 'altText', 'product'],
        },
    },
});
