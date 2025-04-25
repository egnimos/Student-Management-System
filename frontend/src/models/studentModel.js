/**
 * @typedef {Object} StudentModel
 * @property {number | null} id
 * @property {number | null} roll_number
 * @property {string} profile_pic
 * @property {string} name
 * @property {string} email
 * @property {number | null} mobile_number
 * @property {File | null} image_file
 */

export class StudentModel {
    /**
     * @param {Partial<StudentModel>} data
     */
    constructor(data = {}) {
        /** @type {number|null} */
        this.id = data.id || null

        /** @type {number|null} */
        this.roll_number = data.roll_number || null

        /** @type {string} */
        this.profile_pic = data.profile_pic || "https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_1280.png"

        /** @type {string} */
        this.name = data.name || ""

        /** @type {string} */
        this.email = data.email || ""

        /** @type {number|null} */
        this.mobile_number = data.mobile_number || null

        /** @type {File|null} */
        this.image_file = null
    }

    /** @returns {StudentModel} */
    static default() {
        return new StudentModel()
    }

    /** @returns {FormData} */
    toFormData() {
        const formData = new FormData()
        // file
        formData.append("profile_pic", this.image_file)
        formData.append("roll_number", this.roll_number)
        formData.append("name", this.name)
        formData.append("email", this.email)
        formData.append("mobile_number", this.mobile_number)

        return formData
    }
}