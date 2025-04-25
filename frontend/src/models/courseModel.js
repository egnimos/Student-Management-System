
/**
 * @typedef {Object} CourseModel
 * @property {number | null} id
 * @property {string} thumbnail
 * @property {string} title
 * @property {string} description
 * @property {File | null} image_file
 */
export class CourseModel {
    /**
     * 
     * @param {Partial<CourseModel>} data 
     */
    constructor(data = {}) {
        /** @type {number|null} */
        this.id = data.id || null
        /** @type {string} */
        this.thumbnail = data.thumbnail || "https://cdn.pixabay.com/photo/2016/11/03/14/18/stamp-1794352_1280.png"
        /** @type {string} */
        this.description = data.description || ""
        /** @type {string} */
        this.title = data.title || ""

        /** @type {File|null} */
        this.image_file = null
    }

    /** @returns {CourseModel} */
    static default() {
        return new CourseModel()
    }

    /** @returns {FormData} */
    toFormData() {
        const formData = new FormData()
        // file
        formData.append('thumbnail', this.image_file)
        formData.append('title', this.title);
        formData.append('description', this.description);

        return formData
    }
}