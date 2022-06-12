import fs from 'fs';
import db from '../Models/File.js';
import path from 'path';

export default class FileService {
    constructor() {
        this.createAsync = this.createAsync.bind(this);
        this.readOneAsync = this.readOneAsync.bind(this);
        this.readAsync = this.readAsync.bind(this);
        this.updateAsync = this.updateAsync.bind(this);
        this.deleteAsync = this.deleteAsync.bind(this);
    }

    async readOneAsync(id) {
        if (!id) {
            console.log(`Id = ${id};`);
            throw Error('Id is undefined or null!');
        }

        return await db.findById(id);
    }

    async readAsync() {
        return await db.find();
    }

    #isVideo(fileExtension) {
        const extensions = ['.mp4', '.avi'];

        let flag = false;

        extensions.forEach((element) => {
            if (element === fileExtension) {
                flag = true;
            }
        });

        return flag;
    }

    async createAsync(file, body) {
        if (!file) {
            throw Error('File is undefined or null!');
        }

        const fileExtension = path.extname(file.name);

        if (!this.#isVideo(fileExtension)) {
            throw Error('Its not video');
        }

        const fileName = Date.now() + fileExtension;
        const filePath = path.resolve('src', 'static', fileName);

        file.mv(filePath);

        return await db.create({
            path: filePath,
            title: body.title,
            description: body.description,
            genre: body.genre,
        });
    }

    async updateAsync(id, file, title, desc, genre) {
        if (!file) {
            throw Error('File is undefined or null!');
        }

        if (!id) {
            console.log(`Id = ${id};`);
            throw Error('Id is undefined or null!');
        }

        const updFile = await db.findByIdAndUpdate(id, {
            title: title,
            description: desc,
            genre: genre,
        });

        fs.unlink(updFile.path, (er) => {
            if (er) {
                throw Error(err);
            }
        });
        file.mv(updFile.path);

        const updatedModel = await db.findById(id);

        return updatedModel;
    }

    async deleteAsync(id) {
        if (!id) {
            console.log(`Id = ${id};`);
            throw Error('Id is undefined or null!');
        }

        const deletedFile = await db.findByIdAndDelete(id);
        fs.unlink(deletedFile.path, (er) => {
            if (er) {
                throw Error(err);
            }
        });
        return deletedFile;
    }
}
