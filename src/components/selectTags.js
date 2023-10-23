/**
 *
 * @param {{ container: HTMLElement, name: string, options: any[], onChange: (selectedOption: string) => void, placeholder: string }} props
 */
function selectTags(props) {
  const { placeholder, options, onChange, container, name } = props;

  let containerEl = null;

  let getFirstElement = () => document.querySelector('#select-' + name);

  const setIsExpanded = (isExpanded) => {
    const firstElement = getFirstElement();

    firstElement.setAttribute('aria-expanded', isExpanded);

    firstElement.classList.toggle('max-h-10');

    firstElement.querySelector('i').classList.toggle('fa-chevron-down');
    firstElement.querySelector('i').classList.toggle('fa-chevron-up');
  };

  function onClickOutside(event) {
    const firstElement = getFirstElement();

    const isExpanded = firstElement.getAttribute('aria-expanded') === 'true';

    if (isExpanded && !containerEl.contains(event.target)) {
      setIsExpanded(false);
    }
  }
  function updateOptions(search) {
    document.querySelectorAll('#select-' + name + '-options .option').forEach((option) => {
      if (option.getAttribute('data-value').toLowerCase().indexOf(search.toLowerCase()) !== -1) {
        option.style.display = 'block';
      } else {
        option.style.display = 'none';
      }
    });

    document.querySelector('#select-' + name + '-form button').style.display =
      search.length === 0 ? 'none' : 'block';
  }

  if (document.querySelector('#select-' + name)) {
    containerEl = document.querySelector('#select-' + name);
  } else {
    containerEl = document.createElement('div');

    containerEl.id = 'select-' + name;
    containerEl.className =
      'flex flex-col gap-3 overflow-hidden bg-white h-80 w-52 rounded-2xl max-h-10';
    containerEl.setAttribute('aria-expanded', 'false');

    containerEl.innerHTML = `
        <button
          id="select-${name}-button"
          class="flex flex-row items-center justify-between px-4 py-2 cursor-pointer"
        >
          <span>${placeholder}</span>
          <i class="fa-solid fa-chevron-down"></i>
        </button>
        <div class="relative flex flex-row px-4">
          <form id="select-${name}-form" class="text-zinc-300">
            <input
              type="text"
              class="w-full p-1 bg-white border-2 rounded outline-none border-zinc-200"
            ></input>

            <button class="hidden" type="reset">
              <i class="absolute cursor-pointer top-[11px] right-12 fa-solid fa-xmark"></i>
            </button>

            <i class="absolute top-[11px] right-6 fa-solid fa-search "></i>
          </form>
        </div>
        <div id="select-${name}-options" class="flex flex-col overflow-auto">
          <!-- options -->
        </div>
      `;

    container.appendChild(containerEl);

    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('touchstart', onClickOutside);

    document.querySelector('#select-' + name + '-button').addEventListener('click', () => {
      const firstElement = getFirstElement();
      const isExpanded = firstElement.getAttribute('aria-expanded') === 'true';

      setIsExpanded(!isExpanded);
    });

    document.querySelector('#select-' + name + '-form').addEventListener('submit', (event) => {
      event.preventDefault();
    });

    document.querySelector('#select-' + name + '-form').addEventListener('reset', () => {
      updateOptions('');
    });
  }

  function renderOptions() {
    const optionsContainer = document.querySelector('#select-' + name + '-options');

    optionsContainer.innerHTML = options
      .map(
        (option) => `
            <div
              data-value="${option}"
              class="option        px-4 py-2 cursor-pointer hover:bg-yellowTheme"
            >
              <span>${option}</span>
            </div>`
      )
      .join('');

    function handleInput(event) {
      const search = event.target.value;

      updateOptions(search);
    }

    document
      .querySelector('#select-' + name + '-form input')
      .addEventListener('input', handleInput);

    document.querySelectorAll('#select-' + name + '-options .option').forEach((option) => {
      const handleOptionClick = (event) => {
        onChange(event.currentTarget.getAttribute('data-value'));

        event.currentTarget.classList.add('bg-yellow-100');

        setIsExpanded(false);
      };

      option.addEventListener('click', handleOptionClick);
    });
  }

  renderOptions();
}

export default selectTags;
