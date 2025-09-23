import groq from 'groq'

export const query = groq`
*[_type=="mal"] {
  ...,
  overskrift,
  delmaler[] {
    ...,
    obligatorisk,
    delmal -> {
      ...,
      overskrift,
      teksteditor[] {
        ...,
        _type == 'block' => {
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
        },
        _type == 'valgRef' => {
          ...,
          obligatorisk,
          valg -> {
            ...,
            beskrivelse,
            alternativer[] {
              _type == 'fritekst' => {
                ...
              },
              _type == 'kategorisertTekstRef' => {
                ...,
                tekst -> {
                  ...,
                  beskrivelse,
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
                kategori -> {
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
          kategorier[] -> {
            ...
          }
        }
      }
    }
  }
}
`
