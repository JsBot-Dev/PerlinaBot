import { load, YAMLException } from 'js-yaml'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { ZodError, type ZodType } from 'zod'
import { PerlinaBotReadError } from './errors'

export async function readYamlFile<T = unknown>(
    filePath: string,
    schema?: ZodType<T>
): Promise<T> {
    const detail = `==> \x1b[31m${filePath}\x1b[0m`
    try {
        const absolute = path.resolve(process.cwd(), filePath)
        const raw = await readFile(absolute, 'utf-8')
        const data = load(raw, { filename: absolute })
        return schema ? schema.parse(data) : (data as T)
    } catch (error) {
        if (error instanceof ZodError) {
            const message = `The file data is invalid. In file \x1b[31m${filePath}\x1b[0m\n`
            const issues = error.issues
                .map(
                    (issue) =>
                        `==> [${issue.path.join('.')}] \x1b[36m${issue.message}\x1b[0m`
                )
                .join('\n')
            throw new PerlinaBotReadError(message + issues)
        }

        if (error instanceof YAMLException) {
            const message = 'The file is not valid YAML.\n'
            throw new PerlinaBotReadError(message + detail, { cause: error })
        }

        if (error instanceof Error && 'code' in error) {
            switch (error.code) {
                case 'EISDIR': {
                    const message = 'Expected a file, Received a directory\n'
                    throw new PerlinaBotReadError(message + detail)
                }
                case 'EPERM':
                case 'EACCES': {
                    const message = 'Permission denied, Cannot read file\n'
                    throw new PerlinaBotReadError(message + detail)
                }
                case 'ENOENT': {
                    const message = 'Cannot find file\n'
                    throw new PerlinaBotReadError(message + detail)
                }
                case 'ENOTDIR': {
                    const message =
                        'Invalid path, a path segment is not a directory\n'
                    throw new PerlinaBotReadError(message + detail)
                }
                case 'ELOOP': {
                    const message =
                        'Too many symbolic links while resolving path\n'
                    throw new PerlinaBotReadError(message + detail)
                }
                default: {
                    throw new PerlinaBotReadError(
                        `Failed to read file(${error.code})\n` + detail,
                        { cause: error }
                    )
                }
            }
        }

        throw new PerlinaBotReadError(
            `Unknown error while reading file\n${detail}\n==> \x1b[36m${
                (error as Error)?.message ?? String(error)
            }\x1b[0m`,
            { cause: error }
        )
    }
}
