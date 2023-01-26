const go = document.querySelector('#go');

go.addEventListener('click', () => {

let mainDirectory = document.querySelector('#main-directory').value;
const rootName = document.querySelector('#root-name').value;
let additionalEdls = document.querySelector('#additional-edls').value;
const project = document.querySelector('#project').value;
const mainTrackExcluded = document.querySelector('#main-track-excluded').checked;
// const emails = document.querySelector('#emails').value;
const updateEpisode = document.querySelector('#update-episode').checked;
let result = document.getElementById("result");
let additionalEdls2 = []

mainDirectory = mainDirectory.replace(/\\/g, '/');

additionalEdls = additionalEdls.split(',');

for (let i = 0; i < additionalEdls.length; i++) {
  additionalEdls2.push('{MAIN_DIRECTORY}/{ROOT_NAME}_'+additionalEdls[i]+'.edl.format(**locals())');
}


  const data = `
  import sys
  import os


  MAIN_DIRECTORY = '${mainDirectory}'
  ROOT_NAME = '${rootName}'

  WORK_DIR = os.getenv('WORK_DIR', 'C:/mty-process-editorial/')
  sys.path.append(WORK_DIR)

  ADDITIONAL_EDLS = [${additionalEdls != 0 ? additionalEdls2 : ''}]



  sys.argv = [
      '{MAIN_DIRECTORY}/{ROOT_NAME}_track01.edl'.format(**locals()),
      '{MAIN_DIRECTORY}/{ROOT_NAME}.mp4'.format(**locals()),
      '{MAIN_DIRECTORY}/{ROOT_NAME}.wav'.format(**locals()),
      'S:/pipeline/pythonmodules/mty-framework-ffmpeg-master/bin/win/ffmpeg.exe',
      '${project} - Episode', '${project} - Sequence', '${project} - Shot',
      'S:/pipeline/pythonmodules/mty-framework-metasync-master',
      '${mainDirectory}',
      ${mainTrackExcluded},
      ADDITIONAL_EDLS,
      '',
      ${updateEpisode},
      3
  ]

  execfile('%s/process_editorial.py' % WORK_DIR)
    `
console.log(data);
//alert('Copy the info from the console and paste it in the Shotgrid Python Console')
});
