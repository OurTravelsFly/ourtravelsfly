// ===== SIMPLE TRAVEL DATA =====
window.travelData = {
    destinations: [
        {
            id: 1,
            name: "Bali, Indonesia",
            image: "assets/destinations/bali.jpg",
            price: 899,
            bestTime: "April - October",
            description: "Tropical paradise with beautiful beaches and vibrant culture",
            category: "beach"
        },
        {
            id: 2,
            name: "Tokyo, Japan",
            image: "assets/destinations/tokyo.jpg",
            price: 1299,
            bestTime: "March - May",
            description: "Vibrant city blending tradition and modernity",
            category: "city"
        },
        {
            id: 3,
            name: "Paris, France",
            image: "assets/destinations/paris.jpg",
            price: 1099,
            bestTime: "April - June",
            description: "City of love with iconic landmarks and rich history",
            category: "cultural"
        },
        {
            id: 4,
            name: "New York, USA",
            image: "assets/destinations/newyork.jpg",
            price: 1499,
            bestTime: "September - November",
            description: "The city that never sleeps with endless attractions",
            category: "city"
        },
        {
            id: 5,
            name: "Sydney, Australia",
            image: "assets/destinations/sydney.jpg",
            price: 1599,
            bestTime: "September - November",
            description: "Coastal city with iconic opera house and harbor",
            category: "beach"
        },
        {
            id: 6,
            name: "Dubai, UAE",
            image: "assets/destinations/dubai.jpg",
            price: 1199,
            bestTime: "November - March",
            description: "Luxury destination with modern architecture and desert adventures",
            category: "adventure"
        },
        {
            id: 7,
            name: "Swiss Alps",
            image: "assets/service-1.jpg",
            price: 1799,
            bestTime: "December - March",
            description: "Snow-capped mountains perfect for skiing and winter sports",
            category: "mountain"
        },
        {
            id: 8,
            name: "Bangkok, Thailand",
            image: "assets/service-2.jpg",
            price: 699,
            bestTime: "November - February",
            description: "Vibrant street food and magnificent temples",
            category: "cultural"
        }
    ],

    offers: [
        {
            id: 1,
            title: "Bali Tropical Getaway",
            image: "assets/offers/bali-offer.jpg",
            discount: "30% OFF",
            price: 629,
            description: "All-inclusive luxury resort with private beach access"
        },
        {
            id: 2,
            title: "Dubai Luxury Escape",
            image: "assets/offers/dubai-offer.jpg",
            discount: "25% OFF",
            price: 974,
            description: "Experience luxury in Dubai's finest hotels"
        },
        {
            id: 3,
            title: "Maldives Paradise",
            image: "assets/offers/maldives-offer.jpg",
            discount: "20% OFF",
            price: 879,
            description: "Overwater bungalows & crystal clear waters"
        },
        {
            id: 4,
            title: "Japan Cultural Tour",
            image: "assets/offers/tokyo-offer.jpg",
            discount: "15% OFF",
            price: 1274,
            description: "Experience traditional Japan with modern comforts"
        }
    ],

    testimonials: [
        {
            id: 1,
            name: "James Rodriguez",
            role: "Software Developer",
            avatar: "assets/testimonials/client-1.jpg",
            rating: 5,
            comment: "FlyTravels made our honeymoon unforgettable! Everything was perfectly organized."
        },
        {
            id: 2,
            name: "Sarah Thompson",
            role: "Marketing Executive",
            avatar: "assets/testimonials/client-2.jpg",
            rating: 5,
            comment: "Best travel platform I've used. The 24/7 support saved me during a flight delay."
        },
        {
            id: 3,
            name: "Emily Chang",
            role: "Graphic Designer",
            avatar: "assets/testimonials/client-3.jpg",
            rating: 4,
            comment: "Great deals and seamless booking process. Will definitely use again!"
        },
        {
            id: 4,
            name: "Michael Turner",
            role: "Business Analyst",
            avatar: "assets/testimonials/client-4.jpg",
            rating: 5,
            comment: "Perfect for family vacations. Kid-friendly options and great prices."
        }
    ]
};

// If images don't exist, use fallback
function getImageUrl(path, fallback) {
    // In production, this would check if image exists
    return path || fallback;
}