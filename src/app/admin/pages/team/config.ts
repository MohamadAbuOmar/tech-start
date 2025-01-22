export const teamTableConfig = {
  defaultPageSize: 10,
  
  filterableColumns: [
    { id: "nameEn", title: "Name (English)" },
    { id: "nameAr", title: "Name (Arabic)" },
    { id: "jobTitleEn", title: "Job Title (English)" },
    { id: "jobTitleAr", title: "Job Title (Arabic)" },
  ],
  
  sortableColumns: ["nameEn", "nameAr", "createdAt", "updatedAt"],

  // Add these required properties
  statusOptions: [
    { value: "ACTIVE", label: "Active" },
    { value: "INACTIVE", label: "Inactive" }
  ] as const,

  statusColors: {
    ACTIVE: "success",
    INACTIVE: "destructive"
  } as const,
} as const
