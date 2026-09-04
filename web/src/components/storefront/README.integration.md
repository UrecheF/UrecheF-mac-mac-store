# Integration strategy

Do not append the new component tree after the existing footer. Integration must replace the legacy services/contact/footer region atomically while preserving the current catalog fetch/filter behavior. ProductCard/CatalogGrid can then replace the legacy inline card markup separately to keep regression scope small.
