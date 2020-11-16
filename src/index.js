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

import glob from 'glob';

import filesListTF from './utils/filesList';
import filesListSyncTF from './utils/filesListSync';
import filesTreeTF from './utils/filesTree';
import filesTreeSyncTF from './utils/filesTreeSync';
import readFileTF from './utils/readFile';
import readFileSyncTF from './utils/readFileSync';
import writeFileTF from './utils/writeFile';
import writeFileSyncTF from './utils/writeFileSync';
import createReadStreamTF from './utils/createReadStream';
import createWriteStreamTF from './utils/createWriteStream';

export type { StreamT } from './types/StreamT';

export default (Module) => {
  const {
    LeanES,
    initializeMixin, meta, util, constant, initialize, resolver, nameBy
  } = Module.NS;

  @filesListTF
  @filesListSyncTF
  @filesTreeTF
  @filesTreeSyncTF
  @readFileTF
  @readFileSyncTF
  @writeFileTF
  @writeFileSyncTF
  @createReadStreamTF
  @createWriteStreamTF
  @initialize
  @resolver(require, name => require(name))
  class FsUtils extends LeanES {
    @nameBy static  __filename = 'FsUtils';
    @meta static object = {};
  }

  return ['FsUtilsAddon', (BaseClass) => {
    @initializeMixin
    class Mixin extends BaseClass {
      @meta static object = {};

      @util glob = glob;
      @constant FsUtils = FsUtils;
    }

    return Mixin;
  }]
}
