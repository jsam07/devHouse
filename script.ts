import * as shell from 'shelljs';

shell.cp('-R', 'src/public/js', 'dist/public/');
shell.cp('-R', 'src/public/images', 'dist/public/');
shell.cp('-R', 'src/views', 'dist/');
shell.cp('-R', 'src/database/prisma', 'dist/database/');
shell.cp('-R', 'src/public/css/demo.css', 'dist/public/css');
shell.cp('-R', 'src/public/css/styles.css', 'dist/public/css');
shell.cp('-R', 'src/public/css/index.css', 'dist/public/css');
