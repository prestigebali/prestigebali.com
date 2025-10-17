import {type StructureResolver} from 'sanity/structure'
import {Settings, Package, Map as MapIcon} from 'lucide-react'

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
      S.divider(),
      // Document types
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
          !['siteSettings', 'destination', 'tourPackage'].includes(
            listItem.getId()!,
          ),
      ),
    ])
