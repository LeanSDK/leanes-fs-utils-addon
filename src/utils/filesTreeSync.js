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
  Module.defineUtil(__filename, (asFoldername: string, ahOptions: ?object = {}): string[] => {
    const data = glob.sync("#{asFoldername}/**/*", ahOptions);
    if (ahOptions.filesOnly) {
      return data
        .map((asPath) => {
          try {
            return [asPath, fs.statSync(asPath).isFile()]
          } catch (err) {
            return [asPath, false]
          }
        }).filter(([asPath, abIsFile]) => abIsFile)
        .map(([asPath, abIsFile]) => path.relative(asFoldername, asPath))
    } else {
      return data.map((asPath) => path.relative(asFoldername, asPath))
    }
  });
}
