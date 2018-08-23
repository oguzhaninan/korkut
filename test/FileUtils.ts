import test from 'ava';

import FileUtils from '../src/Utils/FileUtils';
import InputFormats from '../src/Enums/InputFormats';

test('suffix or prefix add', (t) => {
    const newName: string = FileUtils.addPrefixOrSuffix('example.jpg', 'foo-', '-bar');
    const newName2: string = FileUtils.addPrefixOrSuffix('example.jpg', 'foo.', '.bar');
    const newName3: string = FileUtils.addPrefixOrSuffix('example.jpg', '.foo', 'bar.');
    const newName4: string = FileUtils.addPrefixOrSuffix('example.jpg', 'foo-');
    const newName5: string = FileUtils.addPrefixOrSuffix('example.jpg', null, '-bar');
    const newName6: string = FileUtils.addPrefixOrSuffix('example.jpg', null, null);

    t.is(newName, 'foo-example-bar.jpg');
    t.is(newName2, 'foo.example.bar.jpg');
    t.is(newName3, '.fooexamplebar..jpg');
    t.is(newName4, 'foo-example.jpg');
    t.is(newName5, 'example-bar.jpg');
    t.is(newName6, 'example.jpg');
});

test('filter suffix', (t) => {
    const items: string[] = ['one.1.jpg', 'two.jpg', 'three.3.png', 'four.4.gif', 'five.jpeg'];

    const filterJPG = FileUtils.filterSuffix(items, ['jpg']);
    t.deepEqual(filterJPG, ['one.1.jpg', 'two.jpg']);

    const filterJPEG = FileUtils.filterSuffix(items, ['jpeg']);
    t.deepEqual(filterJPEG, ['five.jpeg']);

    const filterGIF = FileUtils.filterSuffix(items, ['gif']);
    t.deepEqual(filterGIF, ['four.4.gif']);

    const filterPNG = FileUtils.filterSuffix(items, ['png']);
    t.deepEqual(filterPNG, ['three.3.png']);
});

test('is supported file', (t) => {
    t.is(FileUtils.isSupportedFile('example.jpg'), true);
    t.is(FileUtils.isSupportedFile('example.2-0.jpeg'), true);
    t.is(FileUtils.isSupportedFile('/home/foo/example.png'), true);
    t.is(FileUtils.isSupportedFile('/home/foo/example.PNG'), true);
    t.is(FileUtils.isSupportedFile('/home/foo/example.JPEG'), true);
    t.is(FileUtils.isSupportedFile('example.bmp'), true);
});

test('change extension', (t) => {
    const file1: string = FileUtils.changeExtension('foo.jpg', InputFormats.BITMAP);
    t.is(file1, 'foo.bmp');

    const file2: string = FileUtils.changeExtension('foo-bar.example.jpg', InputFormats.PNG);
    t.is(file2, 'foo-bar.example.png');

    const file3: string = FileUtils.changeExtension('/home/bar/foo-bar.example.jpg', InputFormats.PNG);
    t.is(file3, '/home/bar/foo-bar.example.png');
});
