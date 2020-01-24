import * as fs from 'fs';
//import * as path from 'path'
import { join } from 'path'
import * as markdown from 'markdown-parse'
import * as mdify from 'mdify'

export default class Markdown {
    private contentDir: string;
    private postName: string;

    constructor(dir = '', contentType = '', postName = '') {
        this.postName = postName;
        this.contentDir = dir+'/'+contentType;
    }

    getFiles(allPosts = []) {
        const files = this.rreaddirSync(this.contentDir);
        files.forEach((file) => {
            const post = fs.readFileSync(file, 'utf8');
            markdown(post, (error, fm) => {
                if (error) throw error
                allPosts.push(fm)
            })
        })

        return allPosts;
    }

    rreaddirSync (dir, allFiles = []) {
        const files = fs.readdirSync(dir).map(f => join(dir, f))
        allFiles.push(...files)
        /*files.forEach(f => {
            fs.statSync(f).isDirectory() && this.rreaddirSync(f, allFiles)
        })*/
        return allFiles
    }

    writeFile(post, lang) {
        try {
            if (!fs.existsSync(this.contentDir)){
                fs.mkdirSync(this.contentDir);
            }
            let extension = 'md';
            if (lang) {
                extension = lang+'.md';
            }

            let file = this.contentDir+'/'+this.postName+'.'+extension;
            let md = mdify.stringify(post.attributes, post.body);

            var stream = fs.createWriteStream(file);
            stream.once('open', (fd) => {
                stream.write(md);
                stream.end();
            });

            return post;

        } catch (err) {
            return err
        }
    }
}