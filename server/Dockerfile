FROM python:3

ADD . /

RUN pip install Flask
RUN pip install flask_cors
RUN git clone https://github.com/Homebrew/brew ~/.linuxbrew/Homebrew \
&& mkdir ~/.linuxbrew/bin \
&& ln -s ../Homebrew/bin/brew ~/.linuxbrew/bin \
&& eval $(~/.linuxbrew/bin/brew shellenv)

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN $HOME/.linuxbrew/bin/brew tap caffix/amass
RUN $HOME/.linuxbrew/bin/brew install amass
ENV PATH "/.linuxbrew/bin:$PATH"
RUN source ~/.bashrc


EXPOSE 5000

CMD python ./serve/server.py