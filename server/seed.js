require('dotenv').config();
const mongoose = require('mongoose');
const Campaign = require('./models/Campaign');

const campaigns = [
  {
    title: 'Clean Water Awareness',
    message: 'Every 2 minutes a child dies from unsafe water. Help us spread this message beyond our network.',
    story: 'We are a small group of volunteers. Our mission is not fundraising — it is amplifying awareness so policy changes happen.',
    imageUrl: 'https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?w=800&auto=format&fit=crop',
    category: 'Water',
    sources: [
      { label: 'WHO Drinking Water Report', url: 'https://www.who.int/news-room/fact-sheets/detail/drinking-water' },
      { label: 'UNICEF Water Stats', url: 'https://data.unicef.org/topic/water-and-sanitation/drinking-water/' },
    ],
    goalAmount: 5000,
    raisedAmount: 1200,
    reachTarget: 50000,
    reachDelivered: 18000,
    status: 'approved',
  },
  {
    title: 'Mental Health in Schools',
    message: '1 in 7 teens face mental health issues. Teachers are not trained to help. Let us change that.',
    story: 'We want schools to adopt simple mental-health check-ins. This campaign promotes that message.',
    imageUrl: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&auto=format&fit=crop',
    category: 'Health',
    sources: [
      { label: 'CDC Teen Mental Health', url: 'https://www.cdc.gov/mentalhealth/index.htm' },
    ],
    goalAmount: 4000,
    raisedAmount: 2400,
    reachTarget: 30000,
    reachDelivered: 11000,
    status: 'approved',
  },
  {
    title: 'Fix Our Local Library',
    message: 'The library serves 12,000 residents but has 40-year-old wiring. Community funding campaign awareness.',
    story: 'We are local residents. This campaign amplifies the need for library renovation — not the funds themselves.',
    imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&auto=format&fit=crop',
    category: 'Community',
    sources: [{ label: 'Library Association Data', url: 'https://www.ala.org/' }],
    goalAmount: 3000,
    raisedAmount: 600,
    reachTarget: 20000,
    reachDelivered: 4500,
    status: 'approved',
  },
  {
    title: 'Stop Food Waste',
    message: '1/3 of all food produced is wasted. Restaurants throw out millions of meals a week. Spread the word.',
    story: 'We are food-waste advocates. This campaign spreads awareness so behavior changes at scale.',
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop',
    category: 'Environment',
    sources: [{ label: 'FAO Food Loss Data', url: 'https://www.fao.org/food-loss-and-food-waste/flw-data/en/' }],
    goalAmount: 6000,
    raisedAmount: 3200,
    reachTarget: 60000,
    reachDelivered: 22000,
    status: 'approved',
  },
  {
    title: 'Books for Every Child',
    message: '40% of low-income children have no age-appropriate books at home. Help us spread this message.',
    story: 'We advocate for childhood literacy. This campaign amplifies the need for early reading programs.',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop',
    category: 'Education',
    sources: [{ label: 'Reading is Fundamental', url: 'https://www.rif.org/' }],
    goalAmount: 3500,
    raisedAmount: 1500,
    reachTarget: 25000,
    reachDelivered: 8000,
    status: 'approved',
  },
];

(async () => {
  try {
    // Updated to use MONGODB_URI
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Mongo connected (Cloud Atlas)');
    await Campaign.deleteMany({});
    const inserted = await Campaign.insertMany(campaigns);
    console.log(`🌱 Inserted ${inserted.length} campaigns into the cloud database`);
    await mongoose.disconnect();
    console.log('✅ Done');
  } catch (err) {
    console.error('❌ Seed error:', err);
  }
})();