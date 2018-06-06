'use strict';

module.exports = function(grunt) {
	require('time-grunt')(grunt);
	var timestamp = Date.now();
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		config: {
			localfolder: 'public',
			livefolder: 'webs'
		},
		watch: {
			sass: {
				files: ['<%= config.localfolder %>/scss/*.scss', '<%= config.localfolder %>/scss/**/*.scss'],
				tasks: ['sass:all'],
			},
			js: {
				files: ['<%= config.localfolder %>/js/**/**/*'],
				tasks: ['copy:js_to_webs']
			},
		},
		sass: {
			options: {
				outputStyle: 'compressed',
				precision: 10
			},
			// options: {
			// 	precision: 10,
			// 	style: 'expanded',
			// 	sourcemap: 'inline'
			// },
			all: {
				files: [{
						expand: true,
						cwd: '<%= config.localfolder %>/scss/',
						src: ['**/*.scss'],
						dest: '<%= config.livefolder %>/css/',
						ext: '.css'
					}]
			},
		},
		sprite: {
			all: {
				src: '<%= config.localfolder %>/assets/images/sprites/*.png',
				dest: '<%= config.livefolder %>/assets/images/sprites/all.png',
				destCss: '<%= config.localfolder %>/scss/vendors/inspius/_sprites.scss',
				imgPath: '/assets/images/sprites/all.png?v=' + timestamp,
			}
		},
		copy: {
			font_to_webs: {
				files: [{
						expand: true,
						cwd: '<%= config.localfolder %>/fonts/',
						src: ['*'],
						dest: '<%= config.livefolder %>/fonts/',
						filter: 'isFile'
					}]
			},
			js_to_webs: {
				files: [{
						expand: true,
						cwd: '<%= config.localfolder %>/js/',
						src: ['**/*.js'],
						dest: '<%= config.livefolder %>/js/',
						filter: 'isFile'
					}]
			},
			images_to_webs: {
				files: [{
						expand: true,
						cwd: '<%= config.localfolder %>/assets/images/',
						src: ['**'],
						dest: '<%= config.livefolder %>/assets/images/',
						filter: 'isFile'
					}]
			},
			files_to_webs: {
				files: [{
						expand: true,
						cwd: '<%= config.localfolder %>/',
						src: ['*.html'],
						dest: '<%= config.livefolder %>/',
						filter: 'isFile'
					}]
			},
		},
		clean: {
			options: {
				force: true
			},
			live: '<%= config.livefolder %>',
		},
		jshint: {
			options: {
				reporter: require('jshint-stylish'),
				esversion: 6,
				sub: true
			},
			all: ['<%= config.localfolder %>/js/*.js', 'app.js', 'config/*.js', 'models/*.js', 'controllers/*.js', 'routes/*.js', 'services/*.js',
			'!<%= config.localfolder %>/js/intlTelInput.js', '!<%= config.livefolder %>/js/intlTelInput.js'
			]
		},
		uglify: {
			all: {
				options: {
					preserveComments: false,
					mangle: {
						reserved: ['jQuery']
					}
				},
				files: [{
						expand: false,
						src: [''],
						dest: '',
				}]
			}
		},
		browserify: {
			build_sdk: {
				src: [''],
				dest: '',
			}
		},
		githooks: {
			options: {
				// Task-specific options go here. 
			},
			all: {
				options: {
					// Target-specific options go here 
				},
				// Hook definitions go there 
				'pre-commit': 'jshint sass:all',
				'prepare-commit-msg': 'checkcommit',
			}
		},
	});
	grunt.loadNpmTasks('grunt-githooks');
	grunt.loadNpmTasks('grunt-sass');
	// grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-spritesmith');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.registerTask('deploy-build', [
		'clean:live',
		'sprite',
		'sass:all',
		'githooks',
		'jshint',
		'copy:js_to_webs',
		'copy:images_to_webs',
		'copy:font_to_webs',
		'copy:files_to_webs',
	]);
	var target = grunt.option('target') || 'dev';
	grunt.registerTask('deploy', function() {
		grunt.log.writeln('                                                Deploying                                                '.yellow.inverse);
		grunt.task.run('deploy-build');
		if (target === "production") {
		}
	});
	grunt.registerTask('checkcommit', function() {
		var done = this.async();
		var fileData = grunt.file.read(".git/COMMIT_EDITMSG");
		if(fileData.length < 25){
			grunt.log.error("Please update the commit comment > 25 characters");
			done(false);
		}
		done(true);
	});
};
