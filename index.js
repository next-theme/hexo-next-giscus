/* global hexo */

'use strict';

const Util = require('@next-theme/utils');
const utils = new Util(hexo, __dirname);

hexo.extend.filter.register('theme_inject', injects => {

  let config = utils.defaultConfigFile('giscus', 'default.yaml');
  if (!config.enable) return;

  if (!config.repo) {
      hexo.log.warn(`giscus.repo can't be null.`);
      return;
  }

  injects.comment.raw('giscus', `
  {% if page.comments %}
  <div class="comments giscus-container">
  </div>
  {% endif %}
  `);

  injects.bodyEnd.raw('giscus', utils.getFileContent('giscus.njk'));

  injects.style.push(utils.getFilePath('giscus.styl'));

}, (hexo.config.giscus || {}).priority);
