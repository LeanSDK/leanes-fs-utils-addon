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

export type { ConfigurationInterface } from './interfaces/ConfigurationInterface';
export type { ConfigurableInterface } from './interfaces/ConfigurableInterface';

export default (Module) => {
  const {
    initializeMixin, meta, constant, method, patch
  } = Module.NS;

  return ['ConfigurableAddon', (BaseClass: Class<Module.NS.Module>) => {
    @initializeMixin
    class Mixin extends BaseClass {
      @meta static object = {};

      @constant CONFIGURATION =  'ConfigurationProxy';

      @method static including() {
        patch(this.NS.Facade, this.NS.FacadePatch);
      }
    }
    require('./proxies/Configuration').default(Mixin);

    require('./mixins/ConfigurableMixin').default(Mixin);
    require('./mixins/MemoryConfigurationMixin').default(Mixin);

    require('./patches/FacadePatch').default(Mixin);

    return Mixin;
  }]
}
