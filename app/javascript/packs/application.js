import 'src/application.css';

import 'material-design-lite/material.js';

require('@rails/ujs').start();
require('@rails/activestorage').start();
require('channels');

import WebpackerReact from 'webpacker-react';
import TaskBoard from 'components/TaskBoard';
import PasswordReset from 'components/PasswordReset';
import PasswordUpdateForm from 'components/PasswordUpdateForm';

WebpackerReact.setup({ TaskBoard, PasswordReset, PasswordUpdateForm });
