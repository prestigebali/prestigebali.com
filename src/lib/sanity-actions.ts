'use server';

import { getSanityWriteClient } from "./sanity-client";

interface BookingData {
    name: string;
    email: string;
    phoneNumber: string;
    tourPackageId: string;
}

export async function createBooking(bookingData: BookingData) {
    const writeClient = getSanityWriteClient();

    if (!writeClient) {
        return { success: false, message: 'Sanity write client is not configured. Please contact support.' };
    }

    try {
        const doc = {
            _type: 'booking',
            name: bookingData.name,
            email: bookingData.email,
            phoneNumber: bookingData.phoneNumber,
            tourPackage: {
                _type: 'reference',
                _ref: bookingData.tourPackageId,
            },
            bookingDate: new Date().toISOString(),
        };

        await writeClient.create(doc);
        return { success: true, message: 'Booking created successfully.' };

    } catch (error) {
        console.error('Failed to create booking in Sanity:', error);
        return { success: false, message: 'An unexpected error occurred while creating the booking.' };
    }
}
