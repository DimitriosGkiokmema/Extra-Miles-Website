import os
  
def get_unused_images(directory: str) -> list[str]:
    """" Returns a list of unused images in the given folder"""
    curr = get_used_images()
    lst = []

    for pic in os.listdir(directory):
        if 'IMG' in pic and pic not in curr:
            lst.append(pic)

    return lst

def get_used_images() -> list[str]:
    """ Returns a list of image names used in my html code"""
    code = f'''
            '''
    img_names = []
    curr = ''

    for s in code:
        if s.isnumeric():
            curr += s
        elif curr != '':
            img_names.append('IMG_' + curr + '.png')
            curr = ''

    return img_names
    
if __name__ == "__main__":
    lst = get_used_images() + get_unused_images('Images_showers')
    print(lst)
    print(len(lst))
    