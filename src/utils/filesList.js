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

export default (Module) => {
  Module.defineUtil(__filename, async (asFoldername: string, ahOptions: ?object = {}): Promise<string[]> => {
    return await new Promise((resolve, reject) => {
      fs.readdir(asFoldername, ahOptions, (err, data) => {
        if (err != null) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  });
}
