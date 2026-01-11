// Map service IDs to carousel image arrays, built from asset folders.

const toSortedUrls = (modules) =>
  Object.keys(modules)
    .sort()
    .map((key) => modules[key]);

const SERVICE_MEDIA_BY_ID = {
  "excavation-grading": toSortedUrls(
    import.meta.glob("../assets/Grading/*.{jpg,JPG,jpeg,JPEG,png,webp}", {
      eager: true,
      import: "default",
    }),
  ),
  "land-clearing": toSortedUrls(
    import.meta.glob("../assets/LandClearing/*.{jpg,JPG,jpeg,JPEG,png,webp}", {
      eager: true,
      import: "default",
    }),
  ),
  "water-management": toSortedUrls(
    import.meta.glob(
      "../assets/WaterManagement/*.{jpg,JPG,jpeg,JPEG,png,webp}",
      {
        eager: true,
        import: "default",
      },
    ),
  ),
  "gravel-driveways": toSortedUrls(
    import.meta.glob("../assets/GravelDriveways/*.{jpg,JPG,jpeg,JPEG,png,webp}", {
      eager: true,
      import: "default",
    }),
  ),
  "material-delivery": toSortedUrls(
    import.meta.glob("../assets/MaterialHauling/*.{jpg,JPG,jpeg,JPEG,png,webp}", {
      eager: true,
      import: "default",
    }),
  ),
  "site-preparation": toSortedUrls(
    import.meta.glob("../assets/SitePrep/*.{jpg,JPG,jpeg,JPEG,png,webp}", {
      eager: true,
      import: "default",
    }),
  ),
};

export { SERVICE_MEDIA_BY_ID };
