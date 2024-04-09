import testData from "../data/documento.json"

// Whole JSON document
const data = JSON.parse(JSON.stringify(testData))

/**
 * Return the specified lesson.
 * @param {number} class_num  - The class number (from 1 to 2 for now).
 * @param {number} lesson_num - The lesson number inside that class (from 1 to 2 for now).
 * @returns {{name: string, lesson_content: list} | null} A JSON object containing the lesson name and lesson content (An array).
 */
export function getLesson(class_num, lesson_num) {
    const class_list = data.clases;

    if (class_list.length <= (class_num - 1)) {
        return null;
    }

    const selectedClass = class_list[class_num - 1];
    const lessons_list = selectedClass.lecciones;

    if (lessons_list.length <= (lesson_num - 1)) {
        return null;
    }

    const selectedLesson = lessons_list[lesson_num - 1];

    return {
        "name": selectedLesson.nombre,
        "lesson_content": selectedLesson.contenido_leccion
    }
}

/**
 * Return the content of a single lesson.
 * @param {Object} lesson  - The lesson object.
 * @param {number} lesson_content_index - The lesson content index.
 * @returns {{lesson_name: string, lesson_description: string, lesson_image: string, lesson_questions: list} | null} A JSON object containing the specified contents of the lesson.
 */
export function getLessonContent(lesson, lesson_content_index) {
    if (lesson == null) {
        return null;
    }

    const contents = lesson.lesson_content;
    if (contents.length <= (lesson_content_index - 1)) {
        return null;
    }

    return {
        "lesson_name": contents[lesson_content_index - 1].informacion.titulo,
        "lesson_description": contents[lesson_content_index - 1].informacion.descripcion,
        "lesson_image": contents[lesson_content_index - 1].informacion.imagen,
        "lesson_questions": contents[lesson_content_index - 1].preguntas
    }
}