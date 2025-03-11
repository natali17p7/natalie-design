import { readdirSync, statSync, copyFileSync, existsSync, mkdirSync } from "fs"
import * as path from "path"

function copyProjectImages() {
  const projectsRoot = path.join(
    process.cwd(),
    "src/app/[locale]/projects/pages",
  )
  const publicRoot = path.join(process.cwd(), "public/projects/pages")

  // Get all project directories
  const projectDirs = readdirSync(projectsRoot, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

  projectDirs.forEach(projectDir => {
    const sourceDir = path.join(projectsRoot, projectDir)
    const destDir = path.join(publicRoot, projectDir)

    // Create destination directory if needed
    if (!existsSync(destDir)) {
      mkdirSync(destDir, { recursive: true })
    }

    // Process all JPG/JPEG files
    readdirSync(sourceDir)
      .filter(file => /\.jpe?g$/i.test(file))
      .forEach(file => {
        const sourcePath = path.join(sourceDir, file)
        const destPath = path.join(destDir, file)

        // Only copy if file doesn't exist or size differs
        if (
          !existsSync(destPath) ||
          statSync(sourcePath).size !== statSync(destPath).size
        ) {
          copyFileSync(sourcePath, destPath)
        }
      })
  })
}

export function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    copyProjectImages()
  }
}
