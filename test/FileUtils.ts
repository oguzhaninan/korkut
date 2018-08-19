import test from 'ava'

import FileUtils from '../src/Utils/FileUtils'

test('suffix or prefix add', t => {
    let newName: string = FileUtils.addPrefixOrSuffix('example.jpg', 'foo-', '-bar');
    let newName2: string = FileUtils.addPrefixOrSuffix('example.jpg', 'foo.', '.bar');
    let newName3: string = FileUtils.addPrefixOrSuffix('example.jpg', '.foo', 'bar.');
    let newName4: string = FileUtils.addPrefixOrSuffix('example.jpg', 'foo-');
    let newName5: string = FileUtils.addPrefixOrSuffix('example.jpg', null, '-bar');
    let newName6: string = FileUtils.addPrefixOrSuffix('example.jpg', null, null);
    
    t.is(newName, 'foo-example-bar.jpg');
    t.is(newName2, 'foo.example.bar.jpg');
    t.is(newName3, '.fooexamplebar..jpg');
    t.is(newName4, 'foo-example.jpg');
    t.is(newName5, 'example-bar.jpg');
    t.is(newName6, 'example.jpg');
});