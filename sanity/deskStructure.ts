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
      S.listItem()
        .title('Tour Packages')
        .icon(Package)
        .schemaType('tourPackage')
        .child(S.documentTypeList('tourPackage').title('Tour Packages')),
      // The rest of the document types
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            'siteSettings',
            'paymentSettings',
            'heroSettings',
            'destination',
            'tourPackage',
            'promotion',
            'experience',
            'booking',
          ].includes(listItem.getId()!),
      ),
    ])
