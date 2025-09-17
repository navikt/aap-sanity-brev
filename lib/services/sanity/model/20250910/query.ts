import groq from 'groq'

export const query = groq`
*[_type=="mal"] {
  overskrift,
  delmaler[] {
    ...,
    obligatorisk,
    delmal -> {
      ...,
      tittel,
      teksteditor[] {
        ...,
        _type == 'block' => {
          children[] {
            ...,
            _type != 'faktagrunnlag' => {
              ...
            },
            _type == 'faktagrunnlag' => @-> {
            ...
              }
          }
        },
        _type == 'valgRef' => {
          obligatorisk,
          valg -> {
            valg[] {
              _type == 'fritekst' => {
                ...
              },
              _type == 'gruppertTekstRef' => {
                ...,
                tekst -> {
                  title,
                  teksteditor[] {
                    ...,
                    children[] {
                      ...,
                      _type != 'faktagrunnlag' => {
                        ...
                      },
                      _type == 'faktagrunnlag' => @-> {
                          ...
                      }
                    }
                  }
                },
                gruppe -> {
                  ...
                  }
                }
              }
          }
        },
        _type == 'periodetekstRef' => {
          periodetekst -> {
            ...,
            teksteditor[] {
              ...,
              children[] {
                ...,
                _type != 'faktagrunnlag' => {
                  ...
                },
                _type == 'faktagrunnlag' => @-> {
                ...
                }
              }
            }
          }
        },
        _type == 'betingetTekstRef' => {
          ...,
          tekst -> {
            ...,
            teksteditor[] {
              ...,
              children[] {
                ...,
                _type != 'faktagrunnlag' => {
                  ...
                },
                _type == 'faktagrunnlag' => @-> {
                ...
                }
              }
            }
          },
          grupper[] -> {
            ...
          }
        }
      }
    }
  }
}
`
