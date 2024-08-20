import fs from 'fs/promises';

export const readDatabase = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    const lines = data.split('\n').filter(line => line.trim() !== '');
    const students = {};

    lines.forEach((line, index) => {
      if (index === 0) return; // Skip header
      const [firstName, field] = line.split(',');
      if (!students[field]) {
        students[field] = [];
      }
      students[field].push(firstName);
    });

    return students;
  } catch (error) {
    throw error; // Reject the promise with the error
  }
};
