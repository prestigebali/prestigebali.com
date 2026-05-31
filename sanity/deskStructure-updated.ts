import {type StructureResolver} from 'sanity/structure'
import {
  Settings,
  Package,
  Map as MapIcon,
  Tag as TagIcon,
  Presentation,
  Heart,
  Users,
  CreditCard,
  Info,
  Zap,
  BarChart3,
} from 'lucide-react'

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Dashboard Section
      S.listItem()
        .title('📊 Dashboard')
        .icon(BarChart3)
        .child(
          S.list()
            .title('Dashboard')
            .items([
              S.listItem()
                .title('Bookings Dashboard')
                .child(
                  S.document()
                    .documentId('bookings-dashboard')
                    .schemaType('bookingDashboard')
                ),
              S.listItem()
                .title('Analytics Dashboard')
                .child(
                  S.document()
                    .documentId('analytics-dashboard')
                    .schemaType('analyticsDashboard')
                ),
            ])
        ),

      S.divider(),

      // Site Settings singleton
      S.listItem()
        .title('Site Settings')
        .icon(Settings)
        .child(
          S.editor()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings'),
        ),

      // Payment Settings singleton
      S.listItem()
        .title('Payment Settings')
        .icon(CreditCard)
        .child(
          S.editor()
            .schemaType('paymentSettings')
            .documentId('paymentSettings')
            .title('Payment Settings'),
        ),

      // Hero Settings singleton
      S.listItem()
        .title('Hero Settings')
        .icon(Presentation)
        .child(
          S.editor()
            .schemaType('heroSettings')
            .documentId('heroSettings')
            .title('Hero Settings'),
        ),

      S.listItem()
        .title('About Page')
        .icon(Info)
        .child(
          S.editor().schemaType('aboutPage').documentId('aboutPage').title('About Page'),
        ),

      S.divider(),

      // Bookings Management
      S.listItem()
        .title('📋 Bookings')
        .icon(Users)
        .schemaType('booking')
        .child(S.documentTypeList('booking').title('All Bookings')),

      // Promotions
      S.listItem()
        .title('🎯 Promotions')
        .icon(TagIcon)
        .schemaType('promotion')
        .child(S.documentTypeList('promotion').title('Promotions')),

      // Experiences
      S.listItem()
        .title('✨ Experiences')
        .icon(Heart)
        .schemaType('experience')
        .child(S.documentTypeList('experience').title('Experiences')),

      // Destinations
      S.listItem()
        .title('🗺️ Destinations')
        .icon(MapIcon)
        .schemaType('destination')
        .child(S.documentTypeList('destination').title('Destinations')),

      S.divider(),

      // Programs Section - Hierarchical Organization
      S.listItem()
        .title('📦 Programs')
        .icon(Zap)
        .child(
          S.list()
            .title('Programs by Type')
            .items([
              // Day Tours Section
              S.listItem()
                .title('Day Tours (15)')
                .icon(Package)
                .child(
                  S.list()
                    .title('Day Tours')
                    .items([
                      S.listItem()
                        .title('All Day Tours')
                        .child(
                          S.documentTypeList('tourPackage')
                            .title('All Day Tours')
                            .filter('mainCategory == "Day Tour"')
                        ),
                      S.divider(),
                      S.listItem()
                        .title('Water Sports')
                        .child(
                          S.documentTypeList('tourPackage')
                            .title('Water Sports')
                            .filter('mainCategory == "Day Tour" && category == "Water Sports"')
                        ),
                      S.listItem()
                        .title('Cultural Tours')
                        .child(
                          S.documentTypeList('tourPackage')
                            .title('Cultural Tours')
                            .filter('mainCategory == "Day Tour" && category == "Cultural"')
                        ),
                      S.listItem()
                        .title('Adventure')
                        .child(
                          S.documentTypeList('tourPackage')
                            .title('Adventure')
                            .filter('mainCategory == "Day Tour" && category == "Adventure"')
                        ),
                      S.listItem()
                        .title('Leisure Activities')
                        .child(
                          S.documentTypeList('tourPackage')
                            .title('Leisure Activities')
                            .filter('mainCategory == "Day Tour" && category == "Leisure"')
                        ),
                      S.divider(),
                      S.listItem()
                        .title('By Price')
                        .child(
                          S.documentTypeList('tourPackage')
                            .title('Day Tours by Price')
                            .filter('mainCategory == "Day Tour"')
                            .defaultOrdering([{field: 'price', direction: 'asc'}])
                        ),
                      S.divider(),
                      S.listItem()
                        .title('+ Create New Day Tour')
                        .icon(Package)
                        .child(
                          S.document()
                            .schemaType('tourPackage')
                            .title('New Day Tour')
                        ),
                    ])
                ),

              // Holiday Packages Section
              S.listItem()
                .title('Holiday Packages (10)')
                .icon(Package)
                .child(
                  S.list()
                    .title('Holiday Packages')
                    .items([
                      S.listItem()
                        .title('All Holiday Packages')
                        .child(
                          S.documentTypeList('tourPackage')
                            .title('All Holiday Packages')
                            .filter('mainCategory == "Holiday Package"')
                        ),
                      S.divider(),
                      S.listItem()
                        .title('Honeymoon Packages')
                        .child(
                          S.documentTypeList('tourPackage')
                            .title('Honeymoon')
                            .filter('mainCategory == "Holiday Package" && category == "Honeymoon"')
                        ),
                      S.listItem()
                        .title('Family Packages')
                        .child(
                          S.documentTypeList('tourPackage')
                            .title('Family')
                            .filter('mainCategory == "Holiday Package" && category == "Family"')
                        ),
                      S.listItem()
                        .title('Adventure Packages')
                        .child(
                          S.documentTypeList('tourPackage')
                            .title('Adventure')
                            .filter('mainCategory == "Holiday Package" && category == "Adventure"')
                        ),
                      S.divider(),
                      S.listItem()
                        .title('+ Create New Holiday Package')
                        .icon(Package)
                        .child(
                          S.document()
                            .schemaType('tourPackage')
                            .title('New Holiday Package')
                        ),
                    ])
                ),

              // Wellness Retreats
              S.listItem()
                .title('Wellness Retreats')
                .icon(Package)
                .child(
                  S.list()
                    .title('Wellness Retreats')
                    .items([
                      S.listItem()
                        .title('All Wellness Retreats')
                        .child(
                          S.documentTypeList('tourPackage')
                            .title('All Wellness Retreats')
                            .filter('mainCategory == "Wellness Retreat"')
                        ),
                      S.divider(),
                      S.listItem()
                        .title('+ Create New Wellness Retreat')
                        .icon(Package)
                        .child(
                          S.document()
                            .schemaType('tourPackage')
                            .title('New Wellness Retreat')
                        ),
                    ])
                ),
            ])
        ),

      // Rest of document types
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            'siteSettings',
            'paymentSettings',
            'heroSettings',
            'aboutPage',
            'destination',
            'tourPackage',
            'promotion',
            'experience',
            'booking',
          ].includes(listItem.getId()!),
      ),
    ])
