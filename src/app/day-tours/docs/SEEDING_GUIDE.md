# Day Tours Data Seeding Guide

Complete guide for populating your Prestige Bali site with luxury day tour packages.

## Quick Start (3 Steps)

```bash
# 1. Install dependencies
npm install @sanity/client

# 2. Set environment variables
export NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id"
export NEXT_PUBLIC_SANITY_DATASET="production"
export SANITY_API_WRITE_TOKEN="your_write_token"

# 3. Run the seeding script
npx ts-node scripts/seed-day-tours.ts
```

## Getting Your Sanity Credentials

1. Go to [https://manage.sanity.io](https://manage.sanity.io)
2. Select your project
3. **Settings** → **API** → **Tokens**
4. Click **Add API Token**
5. Name it (e.g., "Day Tours")
6. Select **Editor** role
7. Click **Create** and copy the token

## What Gets Created

10 luxury day tour packages:

1. **Luxury Yacht Cruise Tour + Snorkeling** - $350
2. **Devdan Dance Performance + Balinese Lunch** - $180
3. **Watersport Adventure + Luxury Spa** - $280
4. **ENTERTAINMENT & LIFESTYLE – Luxury Adventure** - $420
5. **Uluwatu Sunset, Kecak Dance & Jimbaran Beach Dinner** - $320
6. **Spa - Beach Sunset & Luxury Seafood** - $290
7. **Mount Batur Sunrise Jeep & Hot Springs** - $220
8. **Bali Swing & Waterfall Experience** - $200
9. **White Water Rafting & Jungle Adventure** - $240
10. **Traditional Villages & Balinese Crafts** - $180

Each tour includes:
- Title & description
- Price & duration
- Inclusions list
- Category & destination link
- Active status
- Optional featured image

## Adding Images (Optional)

```bash
# Install additional dependency
npm install node-fetch

# Run image upload script
npx ts-node scripts/seed-images.ts
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Environment variable not set" | Create `.env.local` with your credentials |
| "No destinations found" | Create Bali, Lombok, Uluwatu in Sanity first |
| "Authentication failed" | Verify your write token is valid (not expired) |
| "Image upload failed" | Check URLs are accessible (test in browser) |

## Verify in Sanity Studio

1. Go to your Sanity Studio: `https://your-project.sanity.studio`
2. Click **Tour Packages** in sidebar
3. You should see all 10 tours
4. Click any tour to view/edit details
5. Tours appear on your website at `/day-tours`

## Next Steps

- [ ] Verify tours in Sanity Studio
- [ ] Check they appear on `/day-tours` page
- [ ] Add custom images if needed
- [ ] Test booking flow
- [ ] Deploy to production

---

**Need help?** Check the troubleshooting section or review the script output.
