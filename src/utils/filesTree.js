// This file is part of leanes-fs-utils-addon.
//
// leanes-fs-utils-addon is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// leanes-fs-utils-addon is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with leanes-fs-utils-addon.  If not, see <https://www.gnu.org/licenses/>.

import fs from 'fs';
import glob from 'glob';
import path from 'path';

export default (Module) => {
  Module.defineUtil(__filename, async (asFoldername: string, ahOptions: ?object = {}): Promise<string[]> => {
    return await new Promise((resolve, reject) => {
      glob("#{asFoldername}/**/*", ahOptions, async (err, data) => {
        if (err != null) {
          return reject(err)
        }
        if (ahOptions.filesOnly) {
          return resolve(await Promise.all(data.map((asPath) => {
            return new Promise((resolveStats) => {
              fs.stat(asPath, (aoErr, aoStats) => {
                if (aoErr != null) {
                  resolveStats([asPath, false])
                } else {
                  resolveStats([asPath, aoStats.isFile()])
                }
              })
            })
          })).then((alPaths) =>
            alPaths.filter(([asPath, abIsFile]) => abIsFile)
              .map(([asPath, abIsFile]) => path.relative(asFoldername, asPath))
          ))
        } else {
          return resolve(data.map((asPath) => path.relative(asFoldername, asPath)))
        }
      })
    })
  });
}
