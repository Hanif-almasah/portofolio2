// CMS admin config — password stored as SHA-256 hash only (raw never in repo).
// Recompute: printf '%s' 'YOUR_PASS' | sha256sum
window.PORTO_CONFIG = {
  ADMIN_HASH: "546f02d6fef59ed2bd690651cd2eb19f3a66e63166331f4b1ee597349c62cb4e",
  CONTENT_PATH: "data/content.json",
  STORAGE_KEY: "cv_cms_data"
};
