var gulp = require('gulp');

var less = require('gulp-less');//引入less文件转为除css文件
//
var connect = require('gulp-connect');//引入合并js文件插件

gulp.task('server',function(){
	connect.server({
		root:'dist',//以谁为服务器根目录
		port:8888, //端口号
		livereload:true
	});
});

gulp.task('index', function() {
    //return gulp.src('taobao.html').pipe(gulp.dest('dist'));
    return gulp.src('taobao.html').pipe(gulp.dest('dist')).pipe(connect.reload());
});
gulp.task('index2', function() {
	return gulp.src('html/*.html').pipe(gulp.dest('dist/html')).pipe(connect.reload());
});

//所有less文件
gulp.task('less',function(){
	return gulp.src('css/aaa.less').pipe(less()).pipe(gulp.dest('dist/css'))
})
gulp.task('less2',function(){
	return gulp.src('css/style2.less').pipe(less()).pipe(gulp.dest('css'))
})
gulp.task('less3',function(){
	return gulp.src('css/common.less').pipe(less()).pipe(gulp.dest('css'))
})
gulp.task('less4',function(){
	return gulp.src('css/common.less').pipe(less()).pipe(gulp.dest('css'))
})
gulp.task('css', function() {
	return gulp.src('css/*.css').pipe(gulp.dest('dist/css'))
});
//-----------引入less文件

gulp.task('all', ['index', 'less','less2','index2','less3','less4']);

gulp.task('watch',function(){
		gulp.watch('taobao.html', ['index']);
        gulp.watch('css/aaa.less', ['less'])
		// gulp.watch('css/**/*', ['all'])
		// gulp.watch('html/*.html', ['all'])
})
gulp.task('default',['watch', 'server']);