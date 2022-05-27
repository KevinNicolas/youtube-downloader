import archiver from "archiver"
import { createWriteStream, rmSync as deleteDirectory } from "fs"
import { v4 as UuidV4 } from 'uuid'

export const compressDirectory = async (dirPath: string): Promise<string> => {
  const zip = archiver('zip')
  const zipPath = `${__dirname}/${UuidV4()}.zip`

  zip.pipe(createWriteStream(zipPath))
  zip.directory(dirPath, false)

  await zip.finalize()

  deleteDirectory(dirPath, { force: true, recursive: true })
  return zipPath
}
