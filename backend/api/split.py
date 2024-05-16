from moviepy.editor import VideoFileClip
import os

def extract_frames(movie, times, imgdir):
    if not os.path.exists(imgdir):
        os.makedirs(imgdir)
    
    clip = VideoFileClip(movie)
    
    for t in times:
        #if int(t) % 2 == 0: //funciona mais ou menos
            imgpath = os.path.join(imgdir, '{:05d}.jpg'.format(int(t*clip.fps)))
            try:
                clip.save_frame(imgpath, t)
            except Exception as e:
                print(f"Error saving frame at time {t}: {e}")


movie = './backend/api/com.oculus.mp4'
imgdir = './jpgs'
clip = VideoFileClip(movie)
times = [i/clip.fps for i in range (int(clip.fps * clip.duration))]

extract_frames(movie, times, imgdir)