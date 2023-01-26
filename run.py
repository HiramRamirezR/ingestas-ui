import sys
import os


MAIN_DIRECTORY = 'P:PIC/UserArea/PIPELINE/EdicionPipeline_Input/e100_PIC_v05'
ROOT_NAME = 'e100_PIC_v05'

WORK_DIR = os.getenv('WORK_DIR', 'C:/mty-process-editorial/')
sys.path.append(WORK_DIR)

ADDITIONAL_EDLS = []

sys.argv = [
    '{MAIN_DIRECTORY}/{ROOT_NAME}_track01.edl'.format(**locals()),
    '{MAIN_DIRECTORY}/{ROOT_NAME}.mp4'.format(**locals()),
    '{MAIN_DIRECTORY}/{ROOT_NAME}.wav'.format(**locals()),
    'S:/pipeline/pythonmodules/mty-framework-ffmpeg-master/bin/win/ffmpeg.exe',
    'PIC - Episode', 'PIC - Sequence', 'PIC - Shot',
    'S:/pipeline/pythonmodules/mty-framework-metasync-master',
    MAIN_DIRECTORY,
    False,
    ADDITIONAL_EDLS,
    'hiram.ramirez@mighty.com',
    True,
    3
]

execfile('%s/process_editorial.py' % WORK_DIR)
