import sys
import os

MAIN_DIRECTORY = 'P:/CASM/ProductionArea/clientInputs/EditorialUpdate-230215'
ROOT_NAME = 'CASM_0700'

WORK_DIR = os.getenv('WORK_DIR', 'S:/pipeline/mty-process-editorial/')
sys.path.append(WORK_DIR)

additional_edls = [
'{MAIN_DIRECTORY}/_CASM_0700_EDL_230210_v3_TRACK2.edl'.format(**locals()),
'{MAIN_DIRECTORY}/_CASM_0700_EDL_230210_v3_TRACK3.edl'.format(**locals()),
'{MAIN_DIRECTORY}/_CASM_0700_EDL_230210_v3_TRACK4.edl'.format(**locals()),
]

sys.argv = [
    '{MAIN_DIRECTORY}/_CASM_0700_EDL_230210_v3_TRACK1.edl'.format(**locals()),
    '{MAIN_DIRECTORY}/CASM_0700.mov'.format(**locals()),
    '{MAIN_DIRECTORY}/{ROOT_NAME}.wav'.format(**locals()),
    'S:/pipeline/pythonmodules/mty-framework-ffmpeg-master/bin/win/ffmpeg.exe',
    'CASM - Episode', 'CASM - Sequence', 'CASM - Shot',
    'S:/pipeline/pythonmodules/mty-framework-metasync-master',
    MAIN_DIRECTORY,
    False,
    additional_edls,
    'casm-production@mighty.mx,pipeline@mighty.mx,hiram.ramirez@mighty.mx',
    False,
    3,
    True,
    True,
]

execfile('%s/process_editorial.py' % WORK_DIR)
