import type { Product, Certification, Inquiry, ImagePlaceholder } from './definitions';
import imageData from './placeholder-images.json';

export const placeholderImages: ImagePlaceholder[] = imageData.placeholderImages;

export const products: Product[] = [
  {
    id: 'prod-001',
    name: 'Head-On, Shell-On (HOSO) Black Tiger Shrimp',
    category: 'Shrimp',
    description: 'Premium quality Black Tiger shrimp, prized for their firm texture and rich flavor. Sourced from sustainable farms.',
    sizes: '13/15, 16/20, 21/25, 26/30 pcs/kg',
    packaging: '1kg box, 10 boxes/carton',
    imageId: 'shrimp-1',
  },
  {
    id: 'prod-002',
    name: 'Whole Cleaned Squid',
    category: 'Squid',
    description: 'Tender and flavorful whole cleaned squid, ready for culinary applications. IQF frozen to preserve freshness.',
    sizes: 'U/5, 5/10, 10/15 pcs/kg',
    packaging: '5kg block, 2 blocks/carton',
    imageId: 'squid-1',
  },
  {
    id: 'prod-003',
    name: 'Yellowfin Tuna Loins',
    category: 'Tuna',
    description: 'Sashimi-grade Yellowfin Tuna loins, deep red color and firm texture. Ideal for high-end restaurants and retailers.',
    sizes: '2-4 kg/loin, 4-6 kg/loin',
    packaging: 'Vacuum packed, individually wrapped',
    imageId: 'tuna-loin',
  },
  {
    id: 'prod-004',
    name: 'Blue Swimmer Crab (Half Cut)',
    category: 'Crab',
    description: 'Sweet and succulent Blue Swimmer Crab, conveniently processed as half-cuts for easy preparation.',
    sizes: '4/6, 6/8, 8/12 pcs/kg',
    packaging: '1kg tray, 10 trays/carton',
    imageId: 'crab-1',
  },
  {
    id: 'prod-005',
    name: 'Whole Cuttlefish',
    category: 'Cuttlefish',
    description: 'Firm and flavorful whole cuttlefish, a versatile ingredient for various international cuisines.',
    sizes: '200/300g, 300/500g, 500g up',
    packaging: '2kg block, 6 blocks/carton',
    imageId: 'cuttlefish-1',
  },
  {
    id: 'prod-006',
    name: 'Peeled & Deveined (PND) Vannamei Shrimp',
    category: 'Shrimp',
    description: 'Convenient and ready-to-cook Vannamei shrimp. Peeled, deveined, and tail-on or tail-off options available.',
    sizes: '21/25, 26/30, 31/40, 41/50 pcs/lb',
    packaging: '1kg bag, 10 bags/carton',
    imageId: 'shrimp-1',
  },
  {
    id: 'prod-007',
    name: 'Tuna Steaks',
    category: 'Tuna',
    description: 'Center-cut Yellowfin Tuna steaks, perfect for grilling or searing. Rich in Omega-3.',
    sizes: '150g, 200g per steak',
    packaging: 'Individually vacuum packed',
    imageId: 'tuna-1',
  },
];

export const featuredProducts: Product[] = products.slice(0, 3);

export const certifications: Certification[] = [
  { name: 'HACCP Certified', description: 'Hazard Analysis and Critical Control Points' },
  { name: 'EU Approved', description: 'Compliant with European Union import standards' },
  { name: 'ISO 22000', description: 'Food safety management system certification' },
  { name: 'Friend of the Sea', description: 'Certified sustainable seafood sourcing' },
];

export const inquiries: Inquiry[] = [
    {
      id: 'inq-001',
      name: 'Kenji Tanaka',
      company: 'Tokyo Seafood Imports',
      email: 'k.tanaka@tokyo-seafood.jp',
      country: 'Japan',
      products: ['prod-001', 'prod-003'],
      message: 'We are interested in your HOSO Black Tiger Shrimp and Yellowfin Tuna Loins. Please provide pricing for a full container load for each.',
      createdAt: new Date('2023-10-26T10:00:00Z'),
    },
    {
      id: 'inq-002',
      name: 'Pierre Dubois',
      company: 'Marseille Fine Foods',
      email: 'p.dubois@mffoods.fr',
      country: 'France',
      products: ['prod-002', 'prod-005'],
      message: 'Requesting a quote for your whole cleaned squid and cuttlefish. What are your lead times for delivery to France?',
      createdAt: new Date('2023-10-25T14:30:00Z'),
    },
    {
      id: 'inq-003',
      name: 'Fatima Al Jamil',
      company: 'Dubai Premier Catering',
      email: 'fatima.j@dpcatering.ae',
      country: 'UAE',
      products: ['prod-004'],
      message: 'What is the availability of your Blue Swimmer Crabs? We require a large, consistent supply for our hotel clients.',
      createdAt: new Date('2023-10-24T09:15:00Z'),
    },
  ];

export const companyProfile = {
    history: 'Founded in 2005, Siya Suya International started with a small processing plant and a vision to share the bounty of Sri Lankan waters with the world. Over the past two decades, we have grown into a leading exporter, trusted by clients in Europe, Japan, and the Middle East for our unwavering commitment to quality and freshness.',
    mission: 'Our mission is to be the most trusted source of premium, sustainably-sourced Sri Lankan seafood for the global market. We achieve this through stringent quality control, ethical practices, and building lasting relationships with our partners.',
    exportDestinations: 'We have a strong presence in key global markets, regularly exporting to major ports in France, Germany, the UK (Europe), Tokyo, and Osaka (Japan), as well as Dubai and Doha (Middle East). Our logistics network ensures timely and fresh delivery to all destinations.',
};
