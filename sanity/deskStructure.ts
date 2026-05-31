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
} from 'lucide-react'

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
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
      // Document types
      S.listItem()
        .title('Bookings')
        .icon(Users)
        .schemaType('booking')
        .child(S.documentTypeList('booking').title('Bookings')),
      S.listItem()
        .title('Promotions')
        .icon(TagIcon)
        .schemaType('promotion')
        .child(S.documentTypeList('promotion').title('Promotions')),
      S.listItem()
        .title('Experiences')
        .icon(Heart)
        .schemaType('experience')
        .child(S.documentTypeList('experience').title('Experiences')),
      S.listItem()
        .title('Destinations')
        .icon(MapIcon)
        .schemaType('destination')
        .child(S.documentTypeList('destination').title('Destinations')),
      
      // Programs Section - Hierarchical Organization
      S.listItem()
        .title('Programs')
        .icon(Zap)
        .child(
          S.list()
            .title('Programs by Type')
            .items([
              // Day Tours Section
              S.listItem()
                .title('Day Tours')
                .icon(Package)
                .child(
                  S.list()
                    .title('Day Tours')
                    .items([
                      // All Day Tours
                      S.listItem()
                        .title('All Day Tours')
                        .child(
                          S.documentTypeList('tourPackage')
                            .title('All Day Tours')
                            .filter('mainCategory == "Day Tour"')
                        ),
                      S.divider(),
                      // Day Tours by Experience Category
                      S.listItem()
                        .title('By Experience Category')
                        .child(
                          S.documentTypeList('tourPackage')
                            .title('Day Tours by Category')
                            .filter('mainCategory == "Day Tour"')
                            .defaultOrdering([{field: 'category', direction: 'asc'}])
                        ),
                      S.divider(),
                      // Day Tours by Price
                      S.listItem()
                        .title('By Price (Low to High)')
                        .child(
                          S.documentTypeList('tourPackage')
                            .title('Day Tours by Price')
                            .filter('mainCategory == "Day Tour"')
                            .defaultOrdering([{field: 'price', direction: 'asc'}])
                        ),
                      S.divider(),
                      // Create New Day Tour
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
                .title('Holiday Packages')
                .icon(Package)
                .child(
                  S.list()
                    .title('Holiday Packages')
                    .items([
                      // All Holiday Packages
                      S.listItem()
                        .title('All Holiday Packages')
                        .child(
                          S.documentTypeList('tourPackage')
                            .title('All Holiday Packages')
                            .filter('mainCategory == "Holiday Package"')
                        ),
                      S.divider(),
                      // Holiday Packages by Experience Category
                      S.listItem()
                        .title('By Experience Category')
                        .child(
                          S.documentTypeList('tourPackage')
                            .title('Holiday Packages by Category')
                            .filter('mainCategory == "Holiday Package"')
                            .defaultOrdering([{field: 'category', direction: 'asc'}])
                        ),
                      S.divider(),
                      // Holiday Packages by Price
                      S.listItem()
                        .title('By Price (Low to High)')
                        .child(
                          S.documentTypeList('tourPackage')
                            .title('Holiday Packages by Price')
                            .filter('mainCategory == "Holiday Package"')
                            .defaultOrdering([{field: 'price', direction: 'asc'}])
                        ),
                      S.divider(),
                      // Create New Holiday Package
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
              
              S.divider(),
              // All Tour Packages (for reference/management)
              S.listItem()
                .title('All Tour Packages (Legacy View)')
                .child(S.documentTypeList('tourPackage').title('All Tour Packages')),
            ])
        ),
      
      // The rest of the document types
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
