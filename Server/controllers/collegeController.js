const College = require('../models/college');
const Institution = require('../models/college/institution');
const Principal = require('../models/college/principal');
const Placement = require('../models/college/placement');
const Course = require('../models/college/course');

const getCollege = async (req, res, next) => {
    const { id } = req;
    try {
        const foundCollege = await College.findById(id)
            .populate('institution')
            .populate('principal')
            .populate('placement')
            .populate('programs')
            .select('username principal placement programs logo')
            .exec();

        if (!foundCollege) return res.status(401).json({ 'message': 'unauthorized' });

        res.json(foundCollege);
    }
    catch (err) {
        next(err);
    }
}

const getProfile = async (req, res, next) => {
    const { id } = req;
    try {
        const foundProfile = await College.findById(id).select('logo').exec();
        if (!foundProfile) return res.status(401).json({ 'message': 'unauthorized' });

        res.json(foundProfile.logo);
    }
    catch (err) {
        next(err);
    }
}

const postInstitution = async (req, res, next) => {
    const { name, website, address, mobile } = req.body;
    if (!name || !website || !address || !mobile) return res.status(400).json({ 'message': 'All fields required' });

    const { id } = req;
    try {
        const foundCollege = await College.findById(id).exec();
        if (!foundCollege) return res.status(401).json({ 'message': 'unauthorized' });

        const foundInstitution = await Institution.findOne({ college: id }).exec();
        if (foundInstitution) return res.status(400).json({ 'message': 'Institution info already exists' });

        const query = await Institution.create({
            name,
            website,
            address,
            mobile,
            college: id
        });

        foundCollege.institution = query._id;
        await foundCollege.save();

        res.status(201).json({ 'success': 'Institution info added' });

    }
    catch (err) {
        next(err);
    }
}

const postPrincipal = async (req, res, next) => {
    const { fullName, position, email, mobile } = req.body;
    if (!fullName || !position || !email || !mobile) return res.status(400).json({ 'message': 'All fields required' });

    const { id } = req;
    try {
        const foundCollege = await College.findById(id).exec();
        if (!foundCollege) return res.status(401).json({ 'message': 'unauthorized' });

        const foundPrincipal = await Principal.findOne({ college: id }).exec();
        if (foundPrincipal) return res.status(400).json({ 'message': 'Principal info already exists' });

        const query = await Principal.create({
            fullName,
            position,
            email,
            mobile,
            college: id
        });

        foundCollege.principal = query._id;
        await foundCollege.save();

        res.status(201).json({ 'success': 'Principal info added' });
    }
    catch (err) {
        next(err);
    }
}

const postPlacement = async (req, res, next) => {
    const { fullName, position, email, mobile } = req.body;
    if (!fullName || !position || !email || !mobile) return res.status(400).json({ 'message': 'All fields required' });

    const { id } = req;
    try {
        const foundCollege = await College.findById(id).exec();
        if (!foundCollege) return res.status(401).json({ 'message': 'unauthorized' });

        const foundPlacement = await Placement.findOne({ college: id }).exec();
        if (foundPlacement) return res.status(400).json({ 'message': 'Placement info already exists' });

        const query = await Placement.create({
            fullName,
            position,
            email,
            mobile,
            college: id
        });

        foundCollege.placement = query._id;
        await foundCollege.save();

        res.status(201).json({ 'success': 'Placement info added' });

    }
    catch (err) {
        next(err);
    }
}

const postCourse = async (req, res, next) => {
    const { name, duration, specialization } = req.body;
    if (!name || !duration || !specialization) return res.status(400).json({ 'message': 'All fields required' });

    const { id } = req;
    try {
        const foundCollege = await College.findById(id).exec();
        if (!foundCollege) return res.status(401).json({ 'message': 'unauthorized' });

        const query = await Course.create({
            name,
            duration,
            specialization,
            college: id
        });

        foundCollege.programs = [query._id, ...foundCollege.programs];
        await foundCollege.save();

        res.status(201).json({ 'success': 'Course info added' });
    }
    catch (err) {
        next(err);
    }
}

const postProfile = async (req, res, next) => {
    const { id } = req;
    try {
        const foundCollege = await College.findById(id).exec();
        if (!foundCollege) return res.status(401).json({ 'message': 'unauthorized' });

        if (!req.file) return res.status(400).json({ 'message': 'Only jpg, jpeg and png are allowed and should be less than 2 mb' });

        foundCollege.logo = req.file.buffer;
        await foundCollege.save();

        res.status(201).json({ 'success': 'Profile uploaded successfully' });
    }
    catch (err) {
        next(err);
    }
}

const putInstitution = async (req, res, next) => {
    const { name, website, address, mobile, institutionId } = req.body;
    if (!name || !website || !address || !mobile || !institutionId) return res.status(400).json({ 'message': 'All fields required' });

    const { id } = req;
    try {
        const foundCollege = await College.findById(id).exec();
        if (!foundCollege) return res.status(401).json({ 'message': 'unauthorized' });

        const foundInstitution = await Institution.findById(institutionId).exec();
        if (!foundInstitution) return res.status(400).json({ 'message': 'Institution details not found' });

        if (foundInstitution._id.toString() !== foundCollege.institution.toString()) return res.status(401).json({ 'message': 'unauthorized' });

        foundInstitution.name = name;
        foundInstitution.website = website;
        foundInstitution.address = address;
        foundInstitution.mobile = mobile;
        await foundInstitution.save();

        res.status(201).json({ 'success': 'Institution info updated' });
    }
    catch (err) {
        next(err);
    }
}

const putPrincipal = async (req, res, next) => {
    const { fullName, position, email, mobile, principalId } = req.body;
    if (!fullName || !position || !email || !mobile || !principalId) return res.status(400).json({ 'message': 'All fields required' });

    const { id } = req;
    try {

        const foundCollege = await College.findById(id).exec();
        if (!foundCollege) return res.status(401).json({ 'message': 'unauthorized' });

        const foundPrincipal = await Principal.findById(principalId).exec();
        if (!foundPrincipal) return res.status(400).json({ 'message': 'Principal details not found' });

        if (foundPrincipal._id.toString() !== foundCollege.principal.toString()) return res.status(401).json({ 'message': 'unauthorized' });

        foundPrincipal.fullName = fullName;
        foundPrincipal.position = position;
        foundPrincipal.email = email;
        foundPrincipal.mobile = mobile;
        await foundPrincipal.save();

        res.status(201).json({ 'success': 'Principal info updated' });
    }
    catch (err) {
        next(err);
    }
}

const putPlacement = async (req, res, next) => {
    const { fullName, position, email, mobile, placementId } = req.body;
    if (!fullName || !position || !email || !mobile || !placementId) return res.status(400).json({ 'message': 'All fields required' });

    const { id } = req;
    try {

        const foundCollege = await College.findById(id).exec();
        if (!foundCollege) return res.status(401).json({ 'message': 'unauthorized' });

        const foundPlacement = await Placement.findById(placementId).exec();
        if (!foundPlacement) return res.status(400).json({ 'message': 'Placement details not found' });

        if (foundPlacement._id.toString() !== foundCollege.placement.toString()) return res.status(401).json({ 'message': 'unauthorized' });

        foundPlacement.fullName = fullName;
        foundPlacement.position = position;
        foundPlacement.email = email;
        foundPlacement.mobile = mobile;
        await foundPlacement.save();

        res.status(201).json({ 'success': 'Placement info updated' });
    }
    catch (err) {
        next(err);
    }
}

const putCourse = async (req, res, next) => {
    const { name, duration, specialization, courseId } = req.body;
    if (!name || !duration || !specialization || !courseId) return res.status(400).json({ 'message': 'All fields required' });

    const { id } = req;
    try {
        const foundCollege = await College.findById(id).exec();
        if (!foundCollege) return res.status(401).json({ 'message': 'unauthorized' });

        const foundCourse = await Course.findById(courseId).exec();
        if (!foundCourse) return res.status(400).json({ 'message': 'Course details not found' });

        if (!foundCollege.programs.includes(courseId)) return res.status(401).json({ 'message': 'unauthorized' });

        foundCourse.name = name;
        foundCourse.duration = duration;
        foundCourse.specialization = specialization;
        await foundCourse.save();

        res.status(201).json({ 'success': 'Course info updated' });
    }
    catch (err) {
        next(err);
    }
}

const deleteCourse = async (req, res, next) => {
    const { id } = req;
    const { courseId } = req.params;
    try {
        const foundCollege = await College.findById(id).exec();
        if (!foundCollege) return res.status(401).json({ 'message': 'unauthorized' });

        const foundCourse = await Course.findById(courseId).exec();
        if (!foundCourse) return res.status(400).json({ 'message': 'Course details not found' });

        if (!foundCollege.programs.includes(courseId)) return res.status(401).json({ 'message': 'unauthorized' });

        await Course.findByIdAndDelete(courseId).exec();
        const Programs = foundCollege.programs;
        foundCollege.programs = Programs.filter(cId => cId !== courseId);
        await foundCollege.save();

        res.json({ 'success': 'Course info deleted' });
    }
    catch (err) {
        next(err);
    }
}

module.exports = {
    getCollege,
    getProfile,
    postInstitution,
    postPrincipal,
    postPlacement,
    postCourse,
    postProfile,
    putInstitution,
    putPrincipal,
    putPlacement,
    putCourse,
    deleteCourse
};