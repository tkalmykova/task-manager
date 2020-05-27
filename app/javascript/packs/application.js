import 'material-design-lite/material.js';

require('@rails/ujs').start();
require('@rails/activestorage').start();
require('channels');

import WebpackerReact from 'webpacker-react';
import TaskBoard from 'components/TaskBoard';

WebpackerReact.setup({ TaskBoard });
